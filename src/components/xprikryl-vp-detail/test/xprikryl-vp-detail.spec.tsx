import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpDetail } from '../xprikryl-vp-detail';

describe('xprikryl-vp-detail', () => {
  const mockPatient = {
    id: '10001',
    name: 'Andrea Križová',
    difficulty: 'easy',
    symptoms: ['fever', 'cough', 'fatigue'],
    anamnesis: 'Patient reports feeling unwell for the past 3 days.'
  };

  it('renders all patient details correctly', async () => {
    XprikrylVpDetail.prototype.componentWillLoad = jest.fn().mockImplementation(
      async function() {
        this.patient = mockPatient;
      }
    );

    const page = await newSpecPage({
      components: [XprikrylVpDetail],
      html: `<xprikryl-vp-detail patient-id="10001"></xprikryl-vp-detail>`,
    });

    await page.waitForChanges();

    // Check if all fields are rendered with correct values
    const textFields = page.root.shadowRoot.querySelectorAll('md-filled-text-field');
    
    expect(textFields.length).toBe(5); // Name, Difficulty, Symptoms, Anamnesis, Your Answer

    // Check name field
    expect(textFields[0].getAttribute('label')).toBe('Name');
    expect(textFields[0].getAttribute('value')).toBe('Andrea Križová');

    // Check difficulty field
    expect(textFields[1].getAttribute('label')).toBe('Difficulty');
    expect(textFields[1].getAttribute('value')).toBe('easy');

    // Check symptoms field
    expect(textFields[2].getAttribute('label')).toBe('Symptoms');
    expect(textFields[2].getAttribute('value')).toBe('fever, cough, fatigue');

    // Check anamnesis field
    expect(textFields[3].getAttribute('label')).toBe('Anamnesis');
    expect(textFields[3].getAttribute('value')).toBe('Patient reports feeling unwell for the past 3 days.');
    expect(textFields[3].getAttribute('type')).toBe('textarea');
  });
});
