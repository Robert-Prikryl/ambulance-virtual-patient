import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpCreate } from '../xprikryl-vp-create';

describe('xprikryl-vp-create', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpCreate],
      html: `<xprikryl-vp-create></xprikryl-vp-create>`,
    });
    expect(page.root).toEqualHtml(`
      <xprikryl-vp-create>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xprikryl-vp-create>
    `);
  });
});
