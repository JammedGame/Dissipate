export { Box };

import Engineer from "./../Engineer";

import { Element } from "./Element";
import { Moveable } from "./Moveable";
import { GameScene } from "./../GameScene";

class Box extends Moveable
{
    public constructor(Scene:GameScene, OriginalLocation:any)
    {
        super(Scene, OriginalLocation);
        this.Data["SpriteSet"].Sprites.push("/build/resources/box.png");
        this.Data["Box"] = true;
    }
    public Update()
    {
        
    }
    public Reset()
    {
        this.Trans.Translation = this.Data["OriginalLocation"];
    }
}