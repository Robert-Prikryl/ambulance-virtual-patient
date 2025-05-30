import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpDetailEditor } from '../xprikryl-vp-detail-editor';

describe('xprikryl-vp-detail-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpDetailEditor],
      html: `<xprikryl-vp-detail-editor></xprikryl-vp-detail-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <xprikryl-vp-detail-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </xprikryl-vp-detail-editor>
    `);
  });
});
