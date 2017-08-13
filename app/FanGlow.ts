export { FanGlow };

import Engineer from "./Engineer";

class FanGlow
{
    private _Glow:any;
    private _Fan:any;
    public constructor(Fan:any)
    {
        this._Fan = Fan;
        this._Glow = new Engineer.Engine.Tile();
        this._Glow.Paint = Engineer.Math.Color.FromRGBA(150, 0, 191, 255);
    }
    public Update() : void
    {
        let Direction:number = <number>this._Fan.Data["Direction"];
        let Range:number = <number>this._Fan.Data["Range"];
        let XLocation:number = this._Fan.Trans.Translation.X;
        let YLocation:number = this._Fan.Trans.Translation.Y;
        let Glow:any = this._Glow;
        if (Direction == 0)
        {
            Glow.Trans.Translation = new Engineer.Math.Vertex(XLocation, YLocation - Range, 0);
            Glow.Trans.Scale = new Engineer.Math.Vertex(100, Range, 1);
        }
        else if (Direction == 1)
        {
            Glow.Trans.Translation = new Engineer.Math.Vertex(XLocation + 100, YLocation, 0);
            Glow.Trans.Scale = new Engineer.Math.Vertex(Range, 100, 1);
        }
        else if (Direction == 2)
        {
            Glow.Trans.Translation = new Engineer.Math.Vertex(XLocation, YLocation + 100, 0);
            Glow.Trans.Scale = new Engineer.Math.Vertex(100, Range, 1);
        }
        else if (Direction == 3)
        {
            Glow.Trans.Translation = new Engineer.Math.Vertex(XLocation - Range, YLocation, 0);
            Glow.Trans.Scale = new Engineer.Math.Vertex(Range, 100, 1);
        }
    }
}