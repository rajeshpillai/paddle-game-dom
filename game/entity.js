// The game is composed of entities
function Entity() {
  if (!(this instanceof Entity)) {
      return new Entity();
  }
  
  // A game entity has a ....

  // A position
  this.x = 0;
  this.y = 0;
  
  // Dimensions
  this.width = 0;
  this.height = 0;

  // A velocity: speed with direction
  this.xVelocity = 0;
  this.yVelocity = 0;


}

// On each update, we apply the velocity to the current position.
// This makes the entity move.
// Entities are expected to override this method
Entity.prototype.update = function () {
  this.px = this.x;  // prev values
  this.py = this.y;
  
  this.x += this.xVelocity;
  this.y += this.yVelocity;

  console.log("entity: ", this);
}

// The entity knows how to draw itself.
// All entities of our game will be white rectangles.



// Basic bounding box collison detection.
// Returns 'true' if the entity intersect with another one
Entity.prototype.intersect = function (other) {
  return this.y + this.height > other.y &&
    this.y < other.y + other.height &&
    this.x + this.width > other.x &&
    this.x < other.x + other.width;
}




