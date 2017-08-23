export { Glow };

import Engineer from "./../Engineer";

class Glow extends Engineer.Engine.Tile
{
    private _Size:number;
    private _Parent:any;
    public constructor(Parent:any, Size:number, Color:any)
    {
        super();
        this._Parent = Parent;
        this._Size = Size;
        this.Paint = Color;
        this.Name = Parent.Name + "_Glow";
        let Tiles:any = new Engineer.Engine.TileCollection(null, ["/build/resources/orb.png"])
        this.Collection = Tiles;
    }
    public Update() : void
    {
        this.Trans.Translation = new Engineer.Math.Vertex(this._Parent.Trans.Translation.X - this._Size / 2 + this._Parent.Trans.Scale.X / 2, this._Parent.Trans.Translation.Y - this._Size / 2 + this._Parent.Trans.Scale.Y / 2, 0)
    }
}