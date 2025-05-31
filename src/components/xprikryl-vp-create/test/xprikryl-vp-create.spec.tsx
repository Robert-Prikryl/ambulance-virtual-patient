import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpCreate } from '../xprikryl-vp-create';
import fetchMock from 'jest-fetch-mock';

describe('xprikryl-vp-create', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders all form fields and submit button', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpCreate],
      html: `<xprikryl-vp-create></xprikryl-vp-create>`,
    });
    const root = page.root.shadowRoot;
    expect(root.querySelector('form')).toBeTruthy();
    expect(root.querySelector('md-filled-text-field[name="name"]')).toBeTruthy();
    expect(root.querySelector('md-filled-select[name="difficulty"]')).toBeTruthy();
    expect(root.querySelector('md-filled-text-field[name="symptoms"]')).toBeTruthy();
    expect(root.querySelector('md-filled-text-field[name="anamnesis"]')).toBeTruthy();
    expect(root.querySelector('md-filled-button[type="submit"]')).toBeTruthy();
  });

  it('shows error message on network issues', async () => {
    // Mock the network error
    fetchMock.mockRejectOnce(new Error('Network Error'));

    const page = await newSpecPage({
      components: [XprikrylVpCreate],
      html: `<xprikryl-vp-create api-base="http://test/api"></xprikryl-vp-create>`,
    });

    const form = page.root.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    
    // Wait for the DOM to update with a more robust approach
    await page.waitForChanges();
    
    // Add a small delay to ensure async operations complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Query the DOM for error message
    const errorMessage = page.root.shadowRoot.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('Cannot create patient');
  });
});
