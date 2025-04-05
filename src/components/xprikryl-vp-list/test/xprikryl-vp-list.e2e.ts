import { newE2EPage } from '@stencil/core/testing';

describe('xprikryl-vp-list', () => {
  it('renders and displays virtual patients', async () => {
    const page = await newE2EPage();
    await page.setContent('<xprikryl-vp-list></xprikryl-vp-list>');

    // Wait for component to load and render
    await page.waitForChanges();

    // Check if component is properly hydrated
    const element = await page.find('xprikryl-vp-list');
    expect(element).toHaveClass('hydrated');

    // Check if list items are rendered
    const listItems = await element.shadowRoot.querySelectorAll('md-list-item');
    expect(listItems.length).toBe(3);

    // Check content of first list item
    const firstPatientName = await element.shadowRoot.querySelector('md-list-item div[slot="headline"]');
    expect(await firstPatientName.textContent).toBe('Andrea Križová');
  });
});
