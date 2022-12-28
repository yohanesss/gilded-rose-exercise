import {
  Shop,
  Item,
  AgedBrie,
  Sulfuras,
  BackstagePasses,
  Conjured,
} from "./gildedRose";

describe("Gilded Rose Refactor", () => {
  describe("Common Item", () => {
    it("should decrease the quality by 1 and decrease the sellIn by 1 for each day passed", () => {
      const gildedRose = new Shop([new Item("normal", 4, 5)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(3);
      expect(item.quality).toBe(4);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(2);
      expect(item.quality).toBe(3);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(1);
      expect(item.quality).toBe(2);
    });

    it("should decrease the quality by 2 and decrease the sellIn by 1 for each day that passes beyond the sellIn day", () => {
      const gildedRose = new Shop([new Item("normal", 1, 5)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(4);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(2);
    });

    it("should not allow the quality of item to fall below 0", () => {
      const gildedRose = new Shop([new Item("normal", 6, 2)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(1);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(0);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(3);
      expect(item.quality).toBe(0);
    });
  });

  describe("Aged Brie", () => {
    it("should increase the quality by 1 and decrease the sellIn by 1 for each day passed", () => {
      const gildedRose = new Shop([new AgedBrie(3, 2)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(2);
      expect(item.quality).toBe(3);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(1);
      expect(item.quality).toBe(4);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(5);
    });

    it("should increase the quality by 2 and decrease the sellIn by 1 for each day that passes beyond the sellIn day", () => {
      const gildedRose = new Shop([new AgedBrie(1, 10)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(11);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(13);
    });

    it("should not allow the quality of the item to exceed 50", () => {
      const gildedRose = new Shop([new AgedBrie(5, 49)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(50);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(3);
      expect(item.quality).toBe(50);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    it("should increase the quality by 1 and decreases the sellIn by 1 for each day passed if the sellIn value is greater than 10", () => {
      const gildedRose = new Shop([new BackstagePasses(13, 5)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(12);
      expect(item.quality).toBe(6);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(11);
      expect(item.quality).toBe(7);
    });

    it("should increase the quality by 2 and decrease the sellIn by 1 for each day passed if the sellIn value is between 10 and 6", () => {
      const gildedRose = new Shop([new BackstagePasses(11, 5)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(10);
      expect(item.quality).toBe(6);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(8);
    });

    it("should increase the quality by 3 and decrease the sellIn by 1 for each day passed if the sellIn value is between 5 and 0", () => {
      const gildedRose = new Shop([new BackstagePasses(6, 3)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(5);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(8);
    });

    it("should set the quality to 0 if the sellIn value is less than 0", () => {
      const gildedRose = new Shop([new BackstagePasses(1, 2)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(5);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(0);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    it("never changes in quality or sellIn", () => {
      const gildedRose = new Shop([new Sulfuras(5, 6)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(6);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(6);
    });
  });

  describe("Conjured", () => {
    it("should decrease the quality by 2 and decrease the sellIn by 1 for each day passed", () => {
      const gildedRose = new Shop([new Conjured(8, 10)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(7);
      expect(item.quality).toBe(8);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(6);
      expect(item.quality).toBe(6);
    });

    it("should decrease the quality by 4 and decrease the sellIn by 1 for each day that passes beyond the sellIn day", () => {
      const gildedRose = new Shop([new Conjured(1, 10)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(8);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(4);
    });

    it("should not allow the quality of the item to be below 0", () => {
      const gildedRose = new Shop([new Conjured(8, 4)]);
      const item = gildedRose.items[0];

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(7);
      expect(item.quality).toBe(2);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(6);
      expect(item.quality).toBe(0);

      gildedRose.updateQuality();
      expect(item.sellIn).toBe(5);
      expect(item.quality).toBe(0);
    });
  });
});
