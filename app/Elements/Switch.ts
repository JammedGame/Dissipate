export { Switch };

import * as TBX from "toybox-engine";

import { Element } from "./Element";
import { GameScene } from "./../GameScene";

class Switch extends Element
{
    protected _Activated:boolean;
    public get Activated():boolean { return this._Activated; }
    public constructor(Scene:GameScene)
    {
        super(Scene);
        this._Activated = false;
        this.Data["Switch"] = true;
        this.Data["OriginalValue"] = false;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
    }
    public Update()
    {
        this._Activated = false;
    }
    public Reset()
    {
        this._Activated = this.Data["OriginalValue"];
    }
}