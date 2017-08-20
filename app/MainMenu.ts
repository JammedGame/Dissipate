export { MainMenu };

import Engineer from "./Engineer";

import { LocalSettings } from "./LocalSettings";

class MainMenu extends Engineer.Engine.Scene2D
{
    public constructor()
    {
        super();
        this.Name = "Menu";
        this.Trans.Scale = new Engineer.Math.Vertex(LocalSettings.Window.Y / LocalSettings.Scale.Y, LocalSettings.Window.Y / LocalSettings.Scale.Y, 1);
        this.Events.Resize.push(this.Resize);
        let Backgrounds:any = new Engineer.Engine.TileCollection(null, ["/build/resources/menu_bck.png"]);
        let Titles:any = new Engineer.Engine.TileCollection(null, ["/build/resources/menu_main_title.png"]);
        let Buttons:any = new Engineer.Engine.TileCollection(null, ["/build/resources/menu_main_play.png", "/build/resources/menu_main_quit.png"]);
        let Background:any = new Engineer.Engine.Tile();
        Background.Name = "Back";
        Background.Collection = Backgrounds;
        Background.Index = 0;
        Background.Trans.Scale = LocalSettings.Scale;
        Background.Trans.Translation = new Engineer.Math.Vertex(LocalSettings.Scale.X/2, LocalSettings.Scale.Y/2, 0);
        this.AddSceneObject(Background);
        let Play:any = new Engineer.Engine.Tile();
        Play.Name = "Play";
        Play.Collection = Buttons;
        Play.Index = 0;
        Play.Trans.Scale = new Engineer.Math.Vertex(250, 60, 1);
        Play.Trans.Translation = new Engineer.Math.Vertex(860, 830, 0);
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.AddSceneObject(Play);
        let Quit:any = new Engineer.Engine.Tile();
        Quit.Name = "Quit";
        Quit.Collection = Buttons;
        Quit.Index = 1;
        Quit.Trans.Scale = new Engineer.Math.Vertex(250, 60, 1);
        Quit.Trans.Translation = new Engineer.Math.Vertex(860, 930, 0);
        Quit.Events.MouseDown.push(this.QuitClick.bind(this));
        Engineer.Util.Log.Print(Quit.Events);
        this.AddSceneObject(Quit);
        let Title:any = new Engineer.Engine.Tile();
        Title.Name = "Title";
        Title.Collection = Titles;
        Title.Index = 0;
        Title.Trans.Scale = new Engineer.Math.Vertex(1034, 152, 1);
        Title.Trans.Translation = new Engineer.Math.Vertex(1147, 526, 0);
        this.AddSceneObject(Title);
    }
    public PlayClick(G:any, Args:any)
    {
        console.log("Play!");
        //let Runner:any = this.Data["Runner"];
        //Runner.SwitchScene("LevelPicker", false);
    }
    public QuitClick(G:any, Args:any)
    {
        console.log("Quit!");
        //let Runner:any = this.Data["Runner"];
        //Runner.Close();
    }
    public Resize(G:any, Args:any)
    {
        //this.Trans.Scale = new Engineer.Math.Vertex(Args.Height / LocalSettings.Scale.Y, Args.Height / LocalSettings.Scale.Y, 1);
    }
}