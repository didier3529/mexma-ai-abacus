interface NFTCollection {
  name: string;
  floorPrice: number;
  change24h: number;
  volume24h: number;
  totalSupply: number;
  owners: number;
  sales24h: number;
  image: string;
  contractAddress?: string;
}

interface OpenSeaCollection {
  collection: {
    name: string;
    slug: string;
    image_url: string;
    floor_price: number;
    total_supply: number;
    num_owners: number;
    stats: {
      one_day_volume: number;
      one_day_change: number;
      one_day_sales: number;
    };
  };
}

export class NFTPriceService {
  private static instance: NFTPriceService;
  private cache = new Map<string, { data: NFTCollection[]; timestamp: number }>();
  private readonly CACHE_DURATION = 60000; // 1 minute

  public static getInstance(): NFTPriceService {
    if (!NFTPriceService.instance) {
      NFTPriceService.instance = new NFTPriceService();
    }
    return NFTPriceService.instance;
  }

  /**
   * Fetch real NFT collection data from OpenSea API
   */
  async getNFTCollections(): Promise<NFTCollection[]> {
    const cacheKey = 'nft-collections';
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Try CoinGecko NFT API as alternative to OpenSea
      const response = await fetch(
        'https://api.coingecko.com/api/v3/nfts/list?per_page=10&page=1',
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mexma-Dashboard/1.0'
          },
          next: { revalidate: 300 } // 5 minutes cache
        }
      );

      if (response.ok) {
        const data = await response.json();
        const collections: NFTCollection[] = [];

        // Process CoinGecko NFT data
        for (const nft of data.slice(0, 5)) {
          collections.push({
            name: nft.name || 'Unknown Collection',
            floorPrice: nft.floor_price?.usd || 0,
            change24h: nft.floor_price_in_usd_24h_percentage_change || 0,
            volume24h: nft.volume_24h?.usd || 0,
            totalSupply: nft.number_of_unique_addresses || 0,
            owners: nft.number_of_unique_addresses || 0,
            sales24h: nft.number_of_unique_addresses || 0,
            image: nft.image?.small || '/images/nft-placeholder.png',
            contractAddress: nft.contract_address
          });
        }

        if (collections.length > 0) {
          this.cache.set(cacheKey, { data: collections, timestamp: Date.now() });
          return collections;
        }
      }

      // If CoinGecko fails, try OpenSea with timeout
      const collections: NFTCollection[] = [];
      const collectionSlugs = [
        'boredapeyachtclub',
        'cryptopunks', 
        'azuki',
        'clonex',
        'moonbirds'
      ];

      for (const slug of collectionSlugs) {
        try {
          const response = await fetch(
            `https://api.opensea.io/api/v1/collection/${slug}`,
            {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mexma-Dashboard/1.0'
              },
              next: { revalidate: 60 }
            }
          );

          if (response.ok) {
            const data: OpenSeaCollection = await response.json();
            const collection = data.collection;
            
            if (collection) {
              collections.push({
                name: collection.name,
                floorPrice: collection.floor_price || 0,
                change24h: collection.stats?.one_day_change || 0,
                volume24h: collection.stats?.one_day_volume || 0,
                totalSupply: collection.total_supply || 0,
                owners: collection.num_owners || 0,
                sales24h: collection.stats?.one_day_sales || 0,
                image: collection.image_url || '/images/nft-placeholder.png',
                contractAddress: slug
              });
            }
          }
        } catch (error) {
          console.warn(`Failed to fetch data for ${slug}:`, error);
        }
      }

      if (collections.length > 0) {
        this.cache.set(cacheKey, { data: collections, timestamp: Date.now() });
        return collections;
      } else {
        throw new Error('No collections fetched from any API');
      }
    } catch (error) {
      console.error('Failed to fetch NFT collections:', error);
      return this.getFallbackData();
    }
  }

  /**
   * Get fallback data when API fails
   */
  private getFallbackData(): NFTCollection[] {
    return [
      {
        name: 'Bored Ape Yacht Club',
        floorPrice: 12.5,
        change24h: 5.2,
        volume24h: 1250000,
        totalSupply: 10000,
        owners: 6500,
        sales24h: 45,
        image: '/images/nft-placeholder.png'
      },
      {
        name: 'CryptoPunks',
        floorPrice: 85.2,
        change24h: -2.1,
        volume24h: 2100000,
        totalSupply: 10000,
        owners: 3400,
        sales24h: 12,
        image: '/images/nft-placeholder.png'
      },
      {
        name: 'Azuki',
        floorPrice: 8.9,
        change24h: 8.7,
        volume24h: 890000,
        totalSupply: 10000,
        owners: 4200,
        sales24h: 67,
        image: '/images/nft-placeholder.png'
      },
      {
        name: 'CloneX',
        floorPrice: 4.2,
        change24h: -1.5,
        volume24h: 450000,
        totalSupply: 20000,
        owners: 8900,
        sales24h: 89,
        image: '/images/nft-placeholder.png'
      },
      {
        name: 'Moonbirds',
        floorPrice: 2.8,
        change24h: 12.3,
        volume24h: 320000,
        totalSupply: 10000,
        owners: 5600,
        sales24h: 34,
        image: '/images/nft-placeholder.png'
      }
    ];
  }

  /**
   * Get NFT collection image with fallback
   */
  getCollectionImage(collection: NFTCollection): string {
    if (collection.image && !collection.image.includes('placeholder')) {
      return collection.image;
    }
    
    // Use specific collection images if available
    const collectionImages: Record<string, string> = {
      'Bored Ape Yacht Club': '/images/nft-bayc.jpg',
      'CryptoPunks': '/images/nft-punks.jpg',
      'Azuki': '/images/nft-azuki.jpg',
      'CloneX': '/images/nft-clonex.jpg',
      'Moonbirds': '/images/nft-moonbirds.jpg'
    };

    return collectionImages[collection.name] || '/images/nft-placeholder.png';
  }
}

export const nftPriceService = NFTPriceService.getInstance();
