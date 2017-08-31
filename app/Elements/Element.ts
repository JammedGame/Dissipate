export { Element };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";

class Element extends Engineer.Engine.Sprite
{
    protected _Scene:GameScene;
    public constructor(Scene:GameScene)
    {
        super();
        this.Data["Element"] = true;
        let SpriteSet:any = new Engineer.Engine.SpriteSet();
        this.SpriteSets.push(SpriteSet);
        this.SpriteSets[0].Seed = 20;
        this.Data["SpriteSet"] = SpriteSet;
        this._Scene = Scene;
        this._Scene.AddSceneObject(this);
    }
    public Update()
    {
        
    }
    public Reset()
    {
        
    }
}