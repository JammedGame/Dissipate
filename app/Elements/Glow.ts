export { Glow };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";

class Glow extends Engineer.Engine.Tile
{
    private _Size:number;
    private _Parent:any;
    public constructor(Scene:GameScene, Parent:any, Size:number, Color:any)
    {
        super();
        this._Parent = Parent;
        this._Size = Size;
        this.Paint = Color;
        this.Name = Parent.Name + "_Glow";
        this.Data["Glow"] = true;
        let Tiles:any = new Engineer.Engine.TileCollection(null, ["/build/resources/orb.png"])
        this.Collection = Tiles;
        this.Index = 0;
        this.Trans.Scale = new Engineer.Math.Vertex(Size, Size, 1);
        this.Update();
        Scene.Objects.splice(0, 0, this);
        Scene.Data[this.Name] = this;
    }
    public Update() : void
    {
        this.Trans.Translation = new Engineer.Math.Vertex(this._Parent.Trans.Translation.X, this._Parent.Trans.Translation.Y, 0)
    }
}