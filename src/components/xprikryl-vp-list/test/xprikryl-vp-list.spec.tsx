import { newSpecPage } from '@stencil/core/testing';
import { XprikrylVpList } from '../xprikryl-vp-list';

describe('xprikryl-vp-list', () => {
  const samplePatients = [
    {
      name: 'Andrea Križová',
      patientId: '10001',
      difficulty: 'easy',
    },
    {
      name: 'Bc. Martin Novotný',
      patientId: '10096',
      difficulty: 'medium',
    },
    {
      name: 'Ing. Jana Svobodová',
      patientId: '10028',
      difficulty: 'hard',
    }
  ];

  // Mock the getListOfVirtualPatients method
  beforeEach(() => {
    XprikrylVpList.prototype.getListOfVirtualPatients = jest.fn().mockImplementation(
      async () => Promise.resolve(samplePatients)
    );
  });

  it('renders list of virtual patients', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpList],
      html: `<xprikryl-vp-list></xprikryl-vp-list>`,
    });

    // Wait for async operations to complete
    await page.waitForChanges();

    // Get all list items
    const items = page.root.shadowRoot.querySelectorAll('md-list-item');
    
    // Check if the number of rendered items matches our sample data
    expect(items.length).toBe(3);

    // Check if the first patient is rendered correctly
    const firstItem = items[0];
    expect(firstItem.querySelector('[slot="headline"]').textContent)
      .toBe('Andrea Križová');
    expect(firstItem.querySelector('.difficulty-indicator').textContent)
      .toBe('easy');
  });

  it('displays correct difficulty indicators', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpList],
      html: `<xprikryl-vp-list></xprikryl-vp-list>`,
    });

    await page.waitForChanges();

    const difficultyIndicators = page.root.shadowRoot.querySelectorAll('.difficulty-indicator');
    
    expect(difficultyIndicators[0].textContent).toBe('easy');
    expect(difficultyIndicators[1].textContent).toBe('medium');
    expect(difficultyIndicators[2].textContent).toBe('hard');
  });

  it('renders person icon for each patient', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpList],
      html: `<xprikryl-vp-list></xprikryl-vp-list>`,
    });

    await page.waitForChanges();

    // Select only the person icons (those with slot="start")
    const personIcons = page.root.shadowRoot.querySelectorAll('md-icon[slot="start"]');
    
    expect(personIcons.length).toBe(3);
    personIcons.forEach(icon => {
      expect(icon.textContent).toBe('person');
      expect(icon.getAttribute('slot')).toBe('start');
    });
  });

  it('renders edit icon for each patient', async () => {
    const page = await newSpecPage({
      components: [XprikrylVpList],
      html: `<xprikryl-vp-list></xprikryl-vp-list>`,
    });

    await page.waitForChanges();

    // Select only the edit icons (those with slot="end")
    const editIcons = page.root.shadowRoot.querySelectorAll('md-icon[slot="end"]');
    
    expect(editIcons.length).toBe(3);
    editIcons.forEach(icon => {
      expect(icon.textContent).toBe('edit');
      expect(icon.getAttribute('slot')).toBe('end');
    });
  });
});
