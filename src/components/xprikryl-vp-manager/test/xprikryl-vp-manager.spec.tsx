import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpManager } from '../xprikryl-vp-manager';

describe('xprikryl-vp-manager', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpManager],
      html: `<xprikryl-vp-manager></xprikryl-vp-manager>`,
    });
    expect(page.root).toEqualHtml(`
      <xprikryl-vp-manager>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xprikryl-vp-manager>
    `);
  });
});
