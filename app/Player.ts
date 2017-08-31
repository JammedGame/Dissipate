export { Player, PlayerKeyPress };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";
import { Glow } from "./Elements/Glow";

class Player extends Engineer.Engine.Sprite
{
    private _Num:number;
    private _Heat:number;
    private _MaxHeat:number;
    private _Glow:Glow;
    public constructor(Num:number, Scene:GameScene)
    {
        super();
        this.Name = "Player" + Num;
        this.Trans.Scale = new Engineer.Math.Vertex(50, 50, 0);
        let SpriteSet:any = new Engineer.Engine.SpriteSet(null,"Default");
        SpriteSet.Sprites = [];
        this.SpriteSets = [SpriteSet];
        this.SpriteSets[0].Sprites.push("/build/resources/orb.png");
        this.Data["Player"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Radius2D;
        this._Num = Num;
        this._Heat = 100;
        this._MaxHeat = 100;
        this._Glow = new Glow(this, 300, Engineer.Math.Color.FromRGBA(255,0,0,125));
        Scene.Objects.splice(0, 0, this._Glow);
        Scene.Data[this._Glow.Name] = this._Glow;
    }
    private UpdatePlayer(G:any, Args:any)
    {
        
    }
    public Reset()
    {

    }
    public MovementRate() : number
    {
        if (this._Heat * 100 / this._MaxHeat < 10) return 3*(this._Heat * 100 / this._MaxHeat)/10 ;
        else return 5- (100 - this._Heat * 100 / this._MaxHeat)/45;
    }
}
class PlayerKeyPress
{
    public Left:boolean;
    public Right:boolean;
    public Down:boolean;
    public Up:boolean;
    public constructor()
    {
        this.Left = false;
        this.Right = false;
        this.Down = false;
        this.Up = false;
    }
}