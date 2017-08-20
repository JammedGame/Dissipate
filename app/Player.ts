export { Player, PlayerKeyPress };

import Engineer from "./Engineer";

class Player extends Engineer.Engine.Sprite
{
    private _Num:number;
    private _Heat:number;
    private _MaxHeat:number;
    public constructor(Num:number)
    {
        super();
        this.Name = "Player" + Num;
        this.Trans.Scale = new Engineer.Math.Vertex(50, 50, 0);
        this.SpriteSets[0].Sprites.push("/build/resources/orb_01.png");
        this.Data["Player"] = true;
        this._Num = Num;
        this._Heat = 100;
        this._MaxHeat = 100;
    }
    private UpdatePlayer(G:any, Args:any)
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