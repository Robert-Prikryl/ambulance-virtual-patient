import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpDetailEditor } from '../xprikryl-vp-detail-editor';
import { VirtualPatientListApi } from '../../../api/ambulance-virtual-patient';

describe('xprikryl-vp-detail-editor', () => {
  const mockPatient = {
    id: '10001',
    recordId: '10001',
    name: 'Andrea Križová',
    difficulty: 2,
    symptoms: ['fever', 'cough', 'fatigue'],
    anamnesis: 'Patient reports feeling unwell for the past 3 days.'
  };

  beforeEach(() => {
    // Mock the API calls
    jest.spyOn(VirtualPatientListApi.prototype, 'getVirtualPatientList').mockResolvedValue([mockPatient]);
    jest.spyOn(VirtualPatientListApi.prototype, 'updateVirtualPatient').mockResolvedValue(mockPatient);
    jest.spyOn(VirtualPatientListApi.prototype, 'deleteVirtualPatient').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders all patient details correctly in edit form', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpDetailEditor],
      html: `<xprikryl-vp-detail-editor api-base="http://localhost:8080" patient-id="10001"></xprikryl-vp-detail-editor>`,
    });

    await page.waitForChanges();

    // Check if all fields are rendered with correct values
    const textFields = page.root.shadowRoot.querySelectorAll('md-filled-text-field');
    const select = page.root.shadowRoot.querySelector('md-filled-select');
    
    expect(textFields.length).toBe(3); // Name, Symptoms, Anamnesis
    expect(select).toBeTruthy();

    // Check name field
    expect(textFields[0].getAttribute('label')).toBe('Name');
    expect(textFields[0].getAttribute('value')).toBe('Andrea Križová');

    // Check difficulty select
    expect(select.getAttribute('label')).toBe('Difficulty');
    expect(select.getAttribute('value')).toBe('2');

    // Check symptoms field
    expect(textFields[1].getAttribute('label')).toBe('Symptoms (comma-separated)');
    expect(textFields[1].getAttribute('value')).toBe('fever, cough, fatigue');

    // Check anamnesis field
    expect(textFields[2].getAttribute('label')).toBe('Anamnesis');
    expect(textFields[2].getAttribute('value')).toBe('Patient reports feeling unwell for the past 3 days.');
    expect(textFields[2].getAttribute('type')).toBe('textarea');
  });

  it('shows error message when patient is not found', async () => {
    // Mock the API to return empty list
    jest.spyOn(VirtualPatientListApi.prototype, 'getVirtualPatientList').mockResolvedValue([]);

    const page = await newSpecPage({
      components: [XprikrylVpDetailEditor],
      html: `<xprikryl-vp-detail-editor api-base="http://localhost:8080" patient-id="10001"></xprikryl-vp-detail-editor>`,
    });

    await page.waitForChanges();

    const errorMessage = page.root.shadowRoot.querySelector('.error-message');
    expect(errorMessage.textContent).toBe('Patient not found');
  });

  it('shows error message when API call fails', async () => {
    // Mock the API to throw an error
    jest.spyOn(VirtualPatientListApi.prototype, 'getVirtualPatientList').mockRejectedValue(new Error('API Error'));

    const page = await newSpecPage({
      components: [XprikrylVpDetailEditor],
      html: `<xprikryl-vp-detail-editor api-base="http://localhost:8080" patient-id="10001"></xprikryl-vp-detail-editor>`,
    });

    await page.waitForChanges();

    const errorMessage = page.root.shadowRoot.querySelector('.error-message');
    expect(errorMessage.textContent).toBe('Failed to load patient details');
  });
});
