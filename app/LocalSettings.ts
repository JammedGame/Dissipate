export { LocalSettings };

import Engineer from "./Engineer";

class LocalSettings
{
    public static WindowState:string = "Normal";
    public static Scale:any = new Engineer.Math.Vertex(1920, 1080, 0);
    public static Window:any = new Engineer.Math.Vertex(1920, 1080, 0);
}