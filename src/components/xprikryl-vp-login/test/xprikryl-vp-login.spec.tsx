import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpLogin } from '../xprikryl-vp-login';

describe('xprikryl-vp-login', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpLogin],
      html: `<xprikryl-vp-login></xprikryl-vp-login>`,
    });
    expect(page.root).toEqualHtml(`
      <xprikryl-vp-login>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xprikryl-vp-login>
    `);
  });
});
