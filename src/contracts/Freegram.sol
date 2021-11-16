pragma solidity ^0.5.0;

contract Freegram {
  string public name = "Freegram";

  // Store Images
  uint public imageCount = 0;
  mapping(uint => Image) public images;

  struct Image {
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );



  // Create Images
  function uploadImage(string memory _imgHash, string memory _description) public {
    
    require(bytes(_description).length > 0);

    require(bytes(_imgHash).length > 0);

    require(msg.sender != address(0x0));

    // Increment image
    imageCount ++;

    // Add image to the contracts
    images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);

    //Trigger the event
    emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);

  }



  // Tip images
  function tipImageOwner(uint _id) public payable {
    //Fetch the image
    Image memory _image = images[_id];

    //Fetch the author
    address payable _author = _image.author;

    address(_author).transfer(msg.value);
  }
}