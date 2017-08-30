export { Lever };

import Engineer from "./../Engineer";

import { Switch } from "./Switch";
import { Player } from "./../Player";
import { Movement } from "./../Movement";
import { GameScene } from "./../GameScene";

class Lever extends Switch
{
    public constructor(Scene:GameScene)
    {
        super(Scene);
        this.Data["SpriteSet"].Sprites.push("/build/resources/lever_0.png");
        this.Data["SpriteSet"].Name = "Disabled";
        let SpriteSet2:any = new Engineer.Engine.SpriteSet(null, "Active");
        this.SpriteSets.push(SpriteSet2);
        SpriteSet2.Sprites.push("/build/resources/lever_1.png");
        this.Data["Lever"] = true;
    }
    public Update()
    {
        if(this._Activated) return;
        let Players:Player[] = this._Scene.GetObjectsWithData("Player");
        for(let i = 0; i < Players.length; i++)
        {
            let Collider1 = Engineer.Util.Collision.CreateColliderObject(Player[i]);
            let Collider2 = Engineer.Util.Collision.CreateColliderObject(this);
            let Collision = Engineer.Math.Collision.Check(Collider1, Collider2);
            if(Collision.Collision) this._Activated = true;
        }
        if(this._Activated) this.SetSpriteSetByName("Active");
    }
    public Reset()
    {
        this._Activated = this.Data["OriginalValue"];
        if(this._Activated) this.SetSpriteSetByName("Active");
        else this.SetSpriteSetByName("Disabled");
    }
}