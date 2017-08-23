export { Door };

import Engineer from "./../Engineer";

import { Element } from "./Element";
import { Switch } from "./Switch";
import { GameScene } from "./../GameScene";

class Door extends Element
{
    private _Effectors:Switch[];
    public constructor(Scene:GameScene)
    {
        super(Scene);
        this._Effectors = [];
        this.Data["SpriteSet"].Sprites.push("/build/resources/door.png");
        this.Data["OriginalValue"] = true;
        this.Data["Solid"] = true;
        this.Data["Door"] = true;
    }
    public Update()
    {
        let Effected:boolean = false;
        for(let i = 0; i < this._Effectors.length; i++) Effected = Effected || this._Effectors[i].Activated;
        this.Active = !Effected;
    }
    public Reset()
    {
        this.Active = this.Data["OriginalValue"];
        this.Data["Solid"] = this.Data["OriginalValue"];
    }
    public AttachEffector(Effector:Switch)
    {
        this._Effectors.push(Effector);
    }
}