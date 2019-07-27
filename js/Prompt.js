const Prompt = function(c, ctx){
  this.c = c;
  this.ctx = ctx;
};
Prompt.prototype.update = function(){
  console.log('Updating Prompt')
  
};
Prompt.prototype.render = function(time){
  this.ctx.font = "30px Arial";
  this.ctx.fillText(time, 10, 50);
  this.ctx.fillRect(this.c.width - 250, 10, 200, 50)
};
