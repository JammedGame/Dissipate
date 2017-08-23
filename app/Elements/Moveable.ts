export { Moveable };

import Engineer from "./../Engineer";

import { Element } from "./Element";
import { GameScene } from "./../GameScene";

class Moveable extends Element
{
    public constructor(Scene:GameScene, OriginalLocation:any)
    {
        super(Scene);
        this.Data["Moveable"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this.Trans.Translation = OriginalLocation;
        this.Data["OriginalLocation"] = OriginalLocation;
    }
    public Update()
    {
        
    }
    public Reset()
    {
        this.Trans.Translation = this.Data["OriginalLocation"];
    }
}