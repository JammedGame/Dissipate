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
    private _Scene:GameScene;
    public constructor(Num:number, Scene:GameScene)
    {
        super();
        this.Name = "Player" + Num;
        this._Scene = Scene;
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
        if (this._Num == 1) this._Glow = new Glow(Scene, this, 300, Engineer.Math.Color.FromRGBA(204,0,0,150));
        else this._Glow = new Glow(Scene, this, 300, Engineer.Math.Color.FromRGBA(255,140,0,150));
        Scene.Events.TimeTick.push(this.UpdatePlayer.bind(this));
    }
    private UpdatePlayer(G:any, Args:any)
    {
        this.UpdatePlayers();
        let HeatSources:any[] = this._Scene.GetObjectsWithData("HeatSource");
        for(let i = 0; i < HeatSources.length; i++)
        {
            if(Engineer.Util.Collision.Check(this, HeatSources[i].Glow).Collision)
            {
                this._Heat += 1;
                if(this._Heat > this._MaxHeat) this._Heat = this._MaxHeat;
            }
        }
        let ColdSources:any[] = this._Scene.GetObjectsWithData("ColdSource");
        for(let i = 0; i < ColdSources.length; i++)
        {
            if(Engineer.Util.Collision.Check(this, ColdSources[i].Glow).Collision) this._Heat -= 0.3;
        }
        if(this._Heat < 0) this._Heat = 0;
        let Value:number = this._Heat / this._MaxHeat;
        if (this._Num == 1) this._Glow.Paint = Engineer.Math.Color.FromRGBA(65 + Value * 149, (1 - Value) * 105, (1 - Value) * 205, 150);
        else if (this._Num == 2)  this._Glow.Paint = Engineer.Math.Color.FromRGBA(Value * 255, 140 + (1 - Value) * 51, (1 - Value) * 255, 150);
    }
    private UpdatePlayers()
    {
        let Players:any[] = this._Scene.GetObjectsWithData("Player");
        let Distance:number = Engineer.Math.Vertex.Distance(Players[0].Trans.Translation, Players[1].Trans.Translation);
        if(Distance < 150)
        {
            let CommonHeat:number = (Players[0].Heat + Players[1].Heat) / 2;
            if(Players[0].Heat > Players[1].Heat) {Players[0].Heat--; Players[1].Heat++;}
            if(Players[1].Heat > Players[0].Heat) {Players[1].Heat--; Players[0].Heat++;}
        }
        this._Heat -= (Distance - 150) / 1000;
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