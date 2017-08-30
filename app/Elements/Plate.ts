export { Plate };

import Engineer from "./../Engineer";

import { Switch } from "./Switch";
import { Moveable } from "./Moveable";
import { Player } from "./../Player";
import { Movement } from "./../Movement";
import { GameScene } from "./../GameScene";

class Plate extends Switch
{
    public constructor(Scene:GameScene)
    {
        super(Scene);
        this.Data["SpriteSet"].Sprites.push("/build/resources/plate_up.png");
        this.Data["SpriteSet"].Name = "Disabled";
        let SpriteSet2:any = new Engineer.Engine.SpriteSet(null, "Active");
        this.SpriteSets.push(SpriteSet2);
        SpriteSet2.Sprites.push("/build/resources/plate_down.png");
        this.Data["Lever"] = true;
    }
    public Update()
    {
        let Previous = this._Activated;
        this._Activated = false;
        let Players:Player[] = this._Scene.GetObjectsWithData("Player");
        for(let i = 0; i < Players.length; i++)
        {
            let Collider1 = Engineer.Util.Collision.CreateColliderObject(Player[i]);
            let Collider2 = Engineer.Util.Collision.CreateColliderObject(this);
            let Collision = Engineer.Math.Collision.Check(Collider1, Collider2);
            if(Collision.Collision) this._Activated = true;
        }
        let Moveables:Moveable[] = this._Scene.GetObjectsWithData("Player");
        for(let i = 0; i < Players.length; i++)
        {
            let Collider1 = Engineer.Util.Collision.CreateColliderObject(Player[i]);
            let Collider2 = Engineer.Util.Collision.CreateColliderObject(this);
            let Collision = Engineer.Math.Collision.Check(Collider1, Collider2);
            if(Collision.Collision) this._Activated = true;
        }
        if(this._Activated != Previous)
        {
            if(this._Activated) this.SetSpriteSetByName("Active");
            else this.SetSpriteSetByName("Disabled");
        }
    }
    public Reset()
    {
        this._Activated = this.Data["OriginalValue"];
        if(this._Activated) this.SetSpriteSetByName("Active");
        else this.SetSpriteSetByName("Disabled");
    }
}