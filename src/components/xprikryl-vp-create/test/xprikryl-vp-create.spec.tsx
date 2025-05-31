import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpCreate } from '../xprikryl-vp-create';

describe('xprikryl-vp-create', () => {
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
});
