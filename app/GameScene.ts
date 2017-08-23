export { GameScene };

import Engineer from "./Engineer";
import * as Level from "./Levels/Levels";

import { LocalSettings } from "./LocalSettings";
import { Player } from "./Player";
import { Movement } from "./Movement";

class GameScene extends Engineer.Engine.Scene2D
{
    private _Seed:number;
    private _BackColorChange:number;
    private _BackColorValue:number;
    private _Player1:Player;
    private _Player2:Player;
    private _Movement:Movement;
    public constructor()
    {
        super();
        this.Name = "GameScene";
        this.BackColor = Engineer.Math.Color.FromRGBA(0,0,0,255);
        this.Events.TimerTick.push();
    }
    public Init() : void
    {
        let Runner:any = this.Data["Runner"];
        let DesiredLevel:string = this.Data["DesiredLevel"];
        this.Trans.Scale = new Engineer.Math.Vertex(Runner.Height * 2 / 1080, Runner.Height * 2 / 1080, 1);
        this._Player1 = new Player(1);
        this._Player2 = new Player(2);
        Level.LevelGenerator.Generate(this, 0);
        this._Movement = new Movement(this._Player1, this._Player2, this);
        //ZoomManager
        this.Events.KeyPress.push(this.KeyPress);
    }
    private KeyPress(G:any, Args:any) : void
    {
        if(Args.KeyDown == "space")
        {
            //Level.Reset();
        }
    }
    private ColorUpdates(G:any, Args:any) : void
    {
        this._Seed++;
        if(this._Seed % 3 != 0) return;
        this.BackColor = Engineer.Math.Color.FromRGBA((104 * (this._BackColorValue / 100.0)), (58 * (this._BackColorValue / 100.0)), (94 * (this._BackColorValue / 100.0)), 255);
        if (this._BackColorValue == 100) this._BackColorChange = -1;
        if (this._BackColorValue == 0) this._BackColorChange = +1;
    }
    public GetObjectsWithData(Key:string, Data?:any) : any[]
    {
        let Objects:any[] = [];
        for(let i = 0; i < this.Objects.length; i++)
        {
            if(this.Objects[Key])
            {
                if(Data)
                {
                    if(this.Objects[Key] == Data) Objects.push(this.Objects[i]);
                }
                else Objects.push(this.Objects[i]);
            }
        }
        return Objects;
    }
}