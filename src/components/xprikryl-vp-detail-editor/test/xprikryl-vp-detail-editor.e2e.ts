import { newE2EPage } from '@stencil/core/testing';

describe('xprikryl-vp-detail-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<xprikryl-vp-detail-editor></xprikryl-vp-detail-editor>');

    const element = await page.find('xprikryl-vp-detail-editor');
    expect(element).toHaveClass('hydrated');
  });
});
