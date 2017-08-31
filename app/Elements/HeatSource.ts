export { HeatSource };

import Engineer from "./../Engineer";

import { Glow } from "./Glow";
import { Element } from "./Element";
import { GameScene } from "./../GameScene";

class HeatSource extends Element
{
    private _Range:number;
    private _Glow:Glow;
    public get Glow():Glow { return this._Glow; }
    public constructor(Scene:GameScene, Range?:number)
    {
        super(Scene);
        this._Range = 300;
        if(Range) this._Range = Range;
        this._Glow = new Glow(Scene, this, this._Range, Engineer.Math.Color.FromRGBA(204, 0, 0, 150));
        this.Data["SpriteSet"].Sprites = ["/build/resources/heat_0.png","/build/resources/heat_1.png","/build/resources/heat_2.png","/build/resources/heat_3.png"];
        this.Data["HeatSource"] = true;
        this.Data["Static"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
    }
    public Update()
    {
        this._Glow.Update();
    }
}