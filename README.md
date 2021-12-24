# opensea-nft-owners

Get the list of NFT owners addresses

## requirements

Get a `MORALIS_API_KEY` from <https://admin.moralis.io/web3Api>

Add `MORALIS_API_KEY` to .env file (see `.env.example`)

## File format for nft projets

Add `your-project-name.csv` file into `nft/` folder by following this format:

```csv
address,token_id
0x495f947276749ce646f68ac8c248420045cb7b5e,36696922899827381019620537961244436122481592204954453783694690372849189781524
0xd07dc4262bcdbf85190c01c996b4c06a461d2430,742343
0x700f045de43fce6d2c25df0288b41669b7566bbe,
```

👆 types of NFTs in these examples:

- OpenSea NFT with specific token_id <https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/36696922899827381019620537961244436122481592204954453783694690372849189781524>
- OpenSea without specific token_id (usually for generative nft projects) <https://opensea.io/assets/0x700f045de43fce6d2c25df0288b41669b7566bbe/1>
- Rarible NFT with specific token_id <https://rarible.com/token/0xd07dc4262bcdbf85190c01c996b4c06a461d2430:742343>

## Generate unique addresses

```bash
node getNFTOwners.js
```

## Results

Unique addresses are outputed in `owners/` folders
