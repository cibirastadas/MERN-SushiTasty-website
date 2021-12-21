import sushies from "../../images/page-covers/sushi.jpg";
import sushiesSets from "../../images/page-covers/sushie-set.jpg";
import salads from "../../images/page-covers/salads.jpg";
import soups from "../../images/page-covers/soup.jpg";
import drinks from "../../images/page-covers/drink.jpg";

export const MenuItems = [
  {
    title: "Sušiai",
    path: "/products/sushies",
    cName: "dropDownLink",
    image: sushies,
    imgProd: "https://img.icons8.com/fluent/80/000000/sushi.png",
  },
  {
    title: "Sušių padėklai",
    path: "/products/sushies-sets",
    cName: "dropDownLink",
    image: sushiesSets,
    imgProd: "https://img.icons8.com/color/80/000000/bento.png",
  },
  {
    title: "Salotos",
    path: "/products/salads",
    cName: "dropDownLink",
    image: salads,
    imgProd: "https://img.icons8.com/fluent/80/000000/vegan-food.png",
  },
  {
    title: "Sriubos",
    path: "/products/soups",
    cName: "dropDownLink",
    image: soups,
    imgProd: "https://img.icons8.com/color/80/000000/noodles.png",
  },
  {
    title: "Gėrimai",
    path: "/products/drinks",
    cName: "dropDownLink",
    image: drinks,
    imgProd: "https://img.icons8.com/color/80/000000/alcohol-bottle.png",
  },
];
