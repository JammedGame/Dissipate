export { LevelGenerator }

import Engineer from "./../Engineer";
import * as Elements from "./../Elements/Elements";

import { LevelList } from "./LevelList";
import { ColliderGenerator } from "./ColliderGenerator";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";

class LevelGenerator
{
    public static Generate(Scene:GameScene, Level:number) : void
    {
        let FieldSize = 100;
        let Collection:any = new Engineer.Engine.TileCollection();
        for(let i = 0; i < 11; i++) Collection.Images.push("/build/resources/tile_"+i+".png");
        let LevelData:any = JSON.parse(LevelList.Levels[Level]);
        for(let i = 0; i < LevelData.Width; i++)
        {
            for(let j = 0; j < LevelData.Height; j++)
            {
                if(LevelData.Terrain[i * LevelData.Width + j] == 0) continue;
                let NewTile:any = new Engineer.Engine.Tile();
                NewTile.Index = LevelData.Terrain[i * LevelData.Width + j] - 1;
                NewTile.Collection = Collection;
                //NewTile.Data["Solid"] = true;
                NewTile.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
                NewTile.Trans.Scale = new Engineer.Math.Vertex(100,100,0);
                NewTile.Trans.Translation = new Engineer.Math.Vertex(j * FieldSize, i * FieldSize, 0);
                Scene.AddSceneObject(NewTile);
            }
        }
        ColliderGenerator.Generate(Scene, LevelData);
        let Player1 = new Player(1, Scene);
        Player1.Trans.Translation = new Engineer.Math.Vertex(LevelData.Player1.X * FieldSize, LevelData.Player1.Y * FieldSize, 0);
        Scene.AddSceneObject(Player1);
        Scene.Data["Player1"] = Player1;
        let Player2 = new Player(2, Scene);
        Player2.Trans.Translation = new Engineer.Math.Vertex(LevelData.Player2.X * FieldSize, LevelData.Player2.Y * FieldSize, 0);
        Scene.AddSceneObject(Player2);
        Scene.Data["Player2"] = Player2;
        Engineer.Util.Log.Print(Scene);
        console.log(Scene);
    }
    private static GenerateElements()
    {

    }
}