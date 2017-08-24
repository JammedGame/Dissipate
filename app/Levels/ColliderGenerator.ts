export { ColliderGenerator }

import Engineer from "./../Engineer";
import * as Elements from "./../Elements/Elements";

import { LevelList } from "./LevelList";
import { GameScene } from "./../GameScene";

class ColliderGenerator
{
    private static FieldSize:number = 100;
    public static Generate(Scene:GameScene, LevelData:any) : void
    {
        let ColliderCollection:CollisionElement[] = [];
        for (let i = 0; i < LevelData.Width; i++)
        {
            for (let j = 0; j < LevelData.Height; j++)
            {
                if (LevelData.Collision[i * LevelData.Width + j] == 0) ColliderGenerator.GenerateCollider(Scene, ColliderCollection, LevelData.Collision, i, j, LevelData.Height, LevelData.Width);
            }
        }
        for (let i = 0; i < ColliderCollection.length; i++)
        {
            ColliderGenerator.GenerateColliderTile(Scene, ColliderCollection[i].Location.Y, ColliderCollection[i].Location.X, ColliderCollection[i].Size.Y, ColliderCollection[i].Size.X);
        }
    }
    private static GenerateColliderTile(Scene:GameScene, X:number, Y:number, XSize:number, YSize:number)
    {
        let NewTile:any = new Engineer.Engine.Tile();
        NewTile.Data["Solid"] = true;
        NewTile.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        NewTile.Trans.Translation = new Engineer.Math.Vertex(X * ColliderGenerator.FieldSize + (XSize * ColliderGenerator.FieldSize) / 2 - 50, Y * ColliderGenerator.FieldSize + (YSize * ColliderGenerator.FieldSize) / 2 - 50, 0);
        NewTile.Trans.Scale = new Engineer.Math.Vertex(XSize * ColliderGenerator.FieldSize, YSize * ColliderGenerator.FieldSize, 1);
        NewTile.Active = false;
        Scene.AddSceneObject(NewTile);
    }
    private static GenerateCollider(Scene:GameScene, ColliderColleciton:CollisionElement[], Collider:number[], X:number, Y:number, Width:number, Height:number) : void
    {
        let Element:CollisionElement = new CollisionElement();
        Element.Location.X = X;
        Element.Location.Y = Y;
        Element.Size.X = 1;
        Element.Size.Y = 1;
        for (let i = X-1; i >= 0; i--)
        {
            if (Collider[i * Width + Y] == 0)
            {
                Element.Location.X = i;
                Element.Size.X++;
            }
            else break;
        }
        for (let i = X + 1; i < Width; i++)
        {
            if (Collider[i * Width + Y] == 0)
            {
                Element.Size.X++;
            }
            else break;
        }
        for (let i = Y - 1; i >= 0; i--)
        {
            let Viable:boolean = true;
            for (let j = Element.Location.X; j < Element.Location.X + Element.Size.X; j++)
            {
                if (Collider[j * Width + i] >= 1)
                {
                    Viable = false;
                }
            }
            if (Viable)
            {
                Element.Location.Y = i;
                Element.Size.Y++;
            }
            else break;
        }
        for (let i = Y + 1; i < Height; i++)
        {
            let Viable:boolean = true;
            for (let j = Element.Location.X; j < Element.Location.X + Element.Size.X; j++)
            {
                if (Collider[j * Width + i] >= 1)
                {
                    Viable = false;
                }
            }
            if (Viable)
            {
                Element.Size.Y++;
            }
            else break;
        }
        let New:boolean = true;
        for(let i = 0; i < ColliderColleciton.length; i++)
        {
            if (ColliderColleciton[i].Location.X == Element.Location.X &&
                ColliderColleciton[i].Location.Y == Element.Location.Y &&
                ColliderColleciton[i].Size.X == Element.Size.X &&
                ColliderColleciton[i].Size.Y == Element.Size.Y) New = false;
        }
        if (New) ColliderColleciton.push(Element);
    }
}
class CollisionElement
{
    public Location:any;
    public Size:any;
    public constructor()
    {
        this.Location = new Engineer.Math.Vertex(0,0,0);
        this.Size = new Engineer.Math.Vertex(0,0,0);
    }
}