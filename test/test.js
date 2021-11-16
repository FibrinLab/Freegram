const Freegram = artifacts.require('./Freegram.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Freegram', ([deployer, author, tipper]) => {
  let freegram

  before(async () => {
    freegram = await Freegram.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await freegram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await freegram.name()
      assert.equal(name, 'Freegram')
    })
  })

  describe('images', async () => {
    let result, imageCount
    const hash = "abc123"

    before(async () => {
      result = await freegram.uploadImage(hash, "desc", { from: author})
      imageCount = await freegram.imageCount()
    })

    it('creates images', async () => {
      assert.equal(imageCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'hash is correct')
      assert.equal(event.description, 'desc', 'desc is correct')
      assert.equal(event.tipAmount, '0', 'tip amount correct')
      assert.equal(event.author, author, 'author is correct')


      // Must have a hash
      await freegram.uploadImage('', 'desc', { from: author}).should.be.rejected;

      //Must have a description
      await freegram.uploadImage('hash', '', { from: author}).should.be.rejected;
  
    })

    //checks fromm struct
    it('lists images', async () => {
      const image = await freegram.images(imageCount)
      assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(image.hash, hash, 'hash is correct')
      assert.equal(image.description, 'desc', 'desc is correct')
      assert.equal(image.tipAmount, '0', 'tip amount correct')
      assert.equal(image.author, author, 'author is correct')    
    })

  })

  

  
})