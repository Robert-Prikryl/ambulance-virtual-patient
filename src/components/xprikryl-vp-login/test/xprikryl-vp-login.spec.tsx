import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpLogin } from '../xprikryl-vp-login';

describe('xprikryl-vp-login', () => {
  it('renders login component with select box', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpLogin],
      html: `<xprikryl-vp-login></xprikryl-vp-login>`,
    });

    const select = page.root.shadowRoot.querySelector('md-filled-select');
    expect(select).toBeTruthy();
    
    const options = select.querySelectorAll('md-select-option');
    expect(options.length).toBe(2);
    expect(options[0].getAttribute('value')).toBe('student');
    expect(options[1].getAttribute('value')).toBe('teacher');
  });
});
