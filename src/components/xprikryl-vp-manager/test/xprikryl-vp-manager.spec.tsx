import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpManager } from '../xprikryl-vp-manager';
import { XprikrylVpList } from '../../xprikryl-vp-list/xprikryl-vp-list';
import { XprikrylVpCreate } from '../../xprikryl-vp-create/xprikryl-vp-create';

describe('xprikryl-vp-manager', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList],
      html: `<xprikryl-vp-manager api-base="http://test/api"></xprikryl-vp-manager>`,
    });
    expect(page.root).toEqualHtml(`
      <xprikryl-vp-manager api-base="http://test/api">
        <mock:shadow-root>
          <xprikryl-vp-list api-base="http://test/api">
            <mock:shadow-root>
              <md-list></md-list>
              <md-filled-icon-button class="add-button">
                <md-icon>add</md-icon>
              </md-filled-icon-button>
            </mock:shadow-root>
          </xprikryl-vp-list>
        </mock:shadow-root>
      </xprikryl-vp-manager>
    `);
  });

  it('renders the list by default', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList, XprikrylVpCreate],
      html: `<xprikryl-vp-manager></xprikryl-vp-manager>`,
    });
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('xprikryl-vp-list')).toBeTruthy();
  });

  it('renders the create form when showCreateForm is true', async () => {

    // Mock the window location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/create' },
      writable: true,
    });

    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList, XprikrylVpCreate],
      html: `<xprikryl-vp-manager api-base="http://test/api"></xprikryl-vp-manager>`,
    });
    
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('xprikryl-vp-create')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('xprikryl-vp-list')).toBeFalsy();
  });

  it('renders the back button in create mode', async () => {
    
    // Mock the window location
    Object.defineProperty(window, 'location', {
      value: { pathname: '/create' },
      writable: true,
    });

    const page = await newSpecPage({
      components: [XprikrylVpManager, XprikrylVpList, XprikrylVpCreate],
      html: `<xprikryl-vp-manager></xprikryl-vp-manager>`,
    });

    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('md-filled-button')).toBeTruthy();
  });
});
