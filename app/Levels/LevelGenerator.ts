export { LevelGenerator }

import Engineer from "./../Engineer";
import * as Elements from "./../Elements/Elements";

import { LevelList } from "./LevelList";
import { GameScene } from "./../GameScene";

class LevelGenerator
{
    public static Generate(Scene:GameScene, Level:number) : void
    {
        Level--;
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
                NewTile.Trans.Scale = new Engineer.Math.Vertex(100,100,0);
                NewTile.Trans.Translation = new Engineer.Math.Vertex(i * FieldSize, j * FieldSize, 0);
                Scene.AddSceneObject(NewTile);
            }
        }
    }
}