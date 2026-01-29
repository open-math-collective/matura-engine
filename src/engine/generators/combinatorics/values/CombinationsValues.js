const MathUtils = require("../../../utils/MathUtils");

class CombinationsValues {
  /**
   * Parameters for sets problem (rule of multiplication)
   * Returns: { nRange, categories, types }
   */
  static getSetsProblemParams(difficulty) {
    if (difficulty === "easy") {
      return {
        nRange: [2, 15],
        categories: [3],
        types: ["clothes", "menu"],
        extraItemRange: [2, 8],
      };
    } else if (difficulty === "hard") {
      return {
        nRange: [3, 50],
        categories: [3, 4, 5],
        types: ["clothes", "menu", "tech", "books", "sports"],
        extraItemRange: [2, 20],
      };
    } else {
      // medium
      return {
        nRange: [2, 25],
        categories: [3, 4],
        types: ["clothes", "menu", "tech"],
        extraItemRange: [2, 12],
      };
    }
  }

  /**
   * Parameters for handshakes/matches problem (C(n,2))
   * Returns: { nRange, types }
   */
  static getHandshakesProblemParams(difficulty) {
    if (difficulty === "easy") {
      return {
        nRange: [3, 20],
        types: ["handshakes", "matches", "connections"],
      };
    } else if (difficulty === "hard") {
      return {
        nRange: [3, 5000],
        types: [
          "handshakes",
          "matches",
          "connections",
          "diagonals",
          "segments",
        ],
      };
    } else {
      return {
        nRange: [5, 40],
        types: ["handshakes", "matches", "connections", "diagonals"],
      };
    }
  }

  /**
   * Parameters for team selection problem (C(n,k))
   * Returns: { nRange, kValues }
   */
  static getTeamSelectionParams(difficulty) {
    if (difficulty === "easy") {
      return {
        nRange: [4, 15],
        kValues: [2],
        groupDescriptions: ["dwuosobową"],
      };
    } else if (difficulty === "hard") {
      return {
        nRange: [5, 2000],
        kValues: [2, 3, 4, 5, 6],
        groupDescriptions: [
          "dwuosobową",
          "trzyosobową",
          "czteroosobową",
          "pięcioosobową",
          "sześcioosobową",
        ],
      };
    } else {
      return {
        nRange: [5, 30],
        kValues: [2, 3],
        groupDescriptions: ["dwuosobową", "trzyosobową"],
      };
    }
  }

  /**
   * Get description templates for different problem types
   */
  static getSetsProblemTemplates(type, categories) {
    const templates = {
      clothes: {
        3: [
          "W szafie wisi {n1} bluzek, leży {n2} par spodni i stoi {n3} par butów. Ile różnych zestawów (bluzka + spodnie + buty) można utworzyć?",
          "W sklepie dostępne są {n1} koszule, {n2} spodnie i {n3} paski. Ile różnych strojów można skompletować?",
          "Mała ma {n1} sukienek, {n2} par butów i {n3} torebek. Na ile sposobów może się ubrać?",
        ],
        4: [
          "W szafie wisi {n1} bluzek, leży {n2} par spodni, stoi {n3} par butów i jest {n4} czapek. Ile różnych zestawów (bluzka + spodnie + buty + czapka) można utworzyć?",
          "W sklepie dostępne są {n1} koszule, {n2} spodnie, {n3} paski i {n4} marynarki. Ile różnych strojów można skompletować?",
        ],
        5: [
          "W szafie wisi {n1} bluzek, leży {n2} par spodni, stoi {n3} par butów, jest {n4} czapek i {n5} szalików. Ile różnych zestawów można utworzyć?",
        ],
      },
      menu: {
        3: [
          "Restauracja oferuje {n1} zup, {n2} drugich dań i {n3} deserów. Ile różnych pełnych zestawów obiadowych można zamówić?",
          "W kawiarni są {n1} rodzaje kawy, {n2} ciasta i {n3} dodatków. Ile różnych zestawów można wybrać?",
          "Stołówka serwuje {n1} zupy, {n2} dania główne i {n3} napoje. Ile różnych kompletnych obiadów można złożyć?",
        ],
        4: [
          "Restauracja oferuje {n1} zup, {n2} drugich dań, {n3} deserów i {n4} napojów. Ile różnych pełnych zestawów obiadowych można zamówić?",
          "W kawiarni są {n1} kawy, {n2} herbaty, {n3} ciasta i {n4} soki. Ile różnych zestawów można wybrać?",
        ],
        5: [
          "Restauracja oferuje {n1} przystawków, {n2} zup, {n3} dań głównych, {n4} deserów i {n5} napojów. Ile różnych pełnych zestawów obiadowych można zamówić?",
        ],
      },
      tech: {
        3: [
          "Sklep oferuje {n1} laptopy, {n2} monitory i {n3} klawiatury. Ile różnych zestawów komputerowych można skompletować?",
          "Producent ma {n1} obudowy, {n2} procesory i {n3} karty graficzne. Ile różnych konfiguracji można stworzyć?",
        ],
        4: [
          "Sklep oferuje {n1} laptopy, {n2} monitory, {n3} klawiatury i {n4} myszki. Ile różnych zestawów komputerowych można skompletować?",
        ],
      },
      books: {
        3: [
          "Biblioteka ma {n1} powieści, {n2} biografie i {n3} poradniki. Ile różnych zestawów (powieść + biografia + poradnik) można wypożyczyć?",
        ],
        4: [
          "Biblioteka ma {n1} powieści, {n2} biografie, {n3} poradniki i {n4} czasopisma. Ile różnych zestawów można wypożyczyć?",
        ],
      },
      sports: {
        3: [
          "Sklep sportowy ma {n1} rowery, {n2} kaski i {n3} bidony. Ile różnych zestawów rowerowych można skompletować?",
        ],
        4: [
          "Sklep sportowy ma {n1} rowery, {n2} kaski, {n3} bidony i {n4} dzwonki. Ile różnych zestawów można skompletować?",
        ],
      },
    };

    const typeTemplates = templates[type] || templates["clothes"];
    const categoryTemplates = typeTemplates[categories] || typeTemplates[3];
    return MathUtils.randomElement(categoryTemplates);
  }

  /**
   * Get description templates for handshakes problem
   */
  static getHandshakesTemplates(type, n) {
    const templates = {
      handshakes: [
        `Na spotkaniu było $$${n}$$ osób. Każdy przywitał się z każdym uściskiem dłoni. Ile nastąpiło powitań?`,
        `W klasie jest $$${n}$$ uczniów. Przed wakacjami każdy uczeń uścisnął dłoń każdemu innemu. Ile było uścisków dłoni?`,
        `Na konferencji zebrało się $$${n}$$ uczestników. Każdy wymienił się uściskiem dłoni z każdym innym. Ile było uścisków?`,
        `Na przyjęciu spotkało się $$${n}$$ gości. Każdy z każdym wymienił uścisk dłoni. Ile uścisków wykonano?`,
        `W biurze pracuje $$${n}$$ osób. Rankiem każdy uścisnął dłoń każdemu koledze. Ile było uścisków?`,
        `W domu kultury zebrało się $$${n}$$ artystów. Każdy poznał się z każdym przez uścisk dłoni. Ile poznań nastąpiło?`,
        `Na evencie networkingowym było $$${n}$$ przedsiębiorców. Każdy wymienił wizytówkę i uścisnął dłoń każdemu innemu. Ile uścisków?`,
        `W kole naukowym jest $$${n}$$ członków. Na zakończenie roku każdy uścisnął dłoń każdemu. Ile uścisków?`,
        `W chórze śpiewa $$${n}$$ osób. Przed koncertem każdy życzył powodzenia każdemu uściskiem dłoni. Ile życzeń?`,
        `W drużynie harcerskiej jest $$${n}$$ harcerzy. Na zbiórce każdy uścisnął dłoń każdemu. Ile uścisków?`,
        `Na konwencie fanów zebrało się $$${n}$$ osób. Każdy przywitał się z każdym uściskiem dłoni. Ile powitań?`,
        `W klubie sportowym jest $$${n}$$ zawodników. Po treningu każdy uścisnął dłoń każdemu koledze. Ile uścisków?`,
        `W stowarzyszeniu działa $$${n}$$ członków. Na walnym zebraniu każdy uścisnął dłoń każdemu. Ile uścisków?`,
        `W zespole muzycznym gra $$${n}$$ muzyków. Przed koncertem każdy uścisnął dłoń każdemu. Ile uścisków?`,
        `Na zjeździe naukowym było $$${n}$$ badaczy. Każdy przedstawił się każdemu uściskiem dłoni. Ile przedstawień?`,
        `W organizacji pozarządowej pracuje $$${n}$$ wolontariuszy. Na spotkaniu każdy uścisnął dłoń każdemu. Ile uścisków?`,
        `W grupie projektowej jest $$${n}$$ osób. Na pierwszym spotkaniu każdy przywitał się z każdym. Ile powitań?`,
        `W akademickim kole teatralnym jest $$${n}$$ studentów. Przed premierą każdy uścisnął dłoń każdemu. Ile uścisków?`,
      ],
      matches: [
        `W turnieju bierze udział $$${n}$$ zawodników (każdy gra z każdym dokładnie jeden mecz). Ile meczów zostanie rozegranych?`,
        `W lidze gra $$${n}$$ drużyn, każda gra z każdą dwa mecze (u siebie i na wyjeździe). Ile meczów zostanie rozegranych w sezonie?`,
        `W turnieju szachowym startuje $$${n}$$ graczy. Każdy gra z każdym jedną partię. Ile partii zostanie rozegranych?`,
        `W rozgrywkach piłkarskich bierze udział $$${n}$$ drużyn systemem każdy z każdym. Ile spotkań odbędzie się w rundzie?`,
        `W turnieju tenisowym gra $$${n}$$ zawodników. Każdy z każdym gra jeden set. Ile setów zostanie rozegranych?`,
        `W zawodach brydżowych startuje $$${n}$$ par. Każda para gra z każdą inną jedną partię. Ile partii?`,
        `W licytacji bridge'a bierze udział $$${n}$$ zespołów. Każdy z każdym rozegra jedną sesję. Ile sesji?`,
        `W turnieju szkolnym w szachy startuje $$${n}$$ uczniów. Każdy gra z każdym jedną partię. Ile partii?`,
        `W rywalizacji koszykarskiej jest $$${n}$$ drużyn. Każda gra z każdą dwa razy. Ile meczów w sezonie?`,
        `W turnieju gier planszowych jest $$${n}$$ graczy. Każdy gra z każdym jedną grę. Ile gier odbędzie się?`,
        `W zawodach siatkarskich bierze udział $$${n}$$ drużyn systemem kołowym. Ile meczów zostanie rozegranych?`,
        `W turnieju e-sportowym gra $$${n}$$ drużyn. Każda gra z każdą jeden mecz. Ile meczów w fazie grupowej?`,
        `W konkursie tańca startuje $$${n}$$ par. Każda para tańczy z każdą inną parą w pojedynku. Ile pojedynków?`,
        `W turnieju brydża sportowego startuje $$${n}$$ zespołów. Każdy z każdym rozegra dwa spotkania. Ile spotkań?`,
        `W rozgrywkach hokeja na lodzie bierze udział $$${n}$$ drużyn. Każda gra z każdą dwa razy. Ile meczów?`,
        `W turnieju badmintona startuje $$${n}$$ graczy. Każdy gra z każdym jeden mecz. Ile meczów zostanie rozegranych?`,
        `W zawodach scrabble bierze udział $$${n}$$ graczy. Każdy gra z każdym jedną partię. Ile partii?`,
        `W turnieju go gra $$${n}$$ zawodników. Każdy gra z każdym jedną partię. Ile partii zostanie rozegranych?`,
      ],
      connections: [
        `W sieci jest $$${n}$$ komputerów. Każdy komputer jest połączony bezpośrednio z każdym innym. Ile połączeń jest w sieci?`,
        `W grafie jest $$${n}$$ wierzchołków. Każdy wierzchołek jest połączony z każdym innym. Ile jest krawędzi w grafie?`,
        `W grupie na portalu społecznościowym jest $$${n}$$ osób. Każdy jest znajomym z każdym innym. Ile znajomości istnieje?`,
        `W wiosce jest $$${n}$$ domów. Każdy dom ma bezpośrednią drogę do każdego innego. Ile dróg jest w wiosce?`,
        `W klastrze serwerów jest $$${n}$$ maszyn. Każda jest połączona z każdą inną bezpośrednim linkiem. Ile linków?`,
        `W sieci telefonicznej jest $$${n}$$ abonentów. Każdy może zadzwonić bezpośrednio do każdego innego. Ile połączeń możliwych?`,
        `W systemie cząstek jest $$${n}$$ punktów. Każdy oddziałuje z każdym innym. Ile interakcji możliwych?`,
        `W konstelacji jest $$${n}$$ gwiazd. Każda jest połączona wizualnie z każdą inną linią. Ile linii?`,
      ],
      diagonals: [
        `W wielokącie wypukłym o $$${n}$$ wierzchołkach ile jest przekątnych?`,
        `Ile przekątnych ma wielokąt o $$${n}$$ wierzchołkach?`,
        `Wielokąt ma $$${n}$$ wierzchołków. Ile można w nim poprowadzić przekątnych?`,
        `Ile przekątnych znajduje się w wielokącie foremnym o $$${n}$$ bokach?`,
        `W wielokącie wypukłym o $$${n}$$ bokach poprowadzono wszystkie przekątne. Ile ich jest?`,
        `W wielokącie o $$${n}$$ wierzchołkach każdy wierzchołek jest połączony przekątnymi z innymi niesąsiadującymi. Ile przekątnych?`,
        `Ile przekątnych ma dziesięciokąt wypukły o $$${n}$$ wierzchołkach?`,
      ],
      segments: [
        `Na prostej leży $$${n}$$ punktów. Ile odcinków można utworzyć, używając tych punktów jako końców?`,
        `Na okręgu leży $$${n}$$ punktów. Ile różnych cięciw można przez nie poprowadzić?`,
        `Na półprostej zaznaczono $$${n}$$ punktów. Ile odcinków o końcach w tych punktach można wyróżnić?`,
        `Na linii umieszczono $$${n}$$ znaczników. Ile odcinków między parami znaczników istnieje?`,
        `W przestrzeni jest $$${n}$$ punktów, z których żadne trzy nie są współliniowe. Ile odcinków łączy te punkty?`,
        `Na planszy postawiono $$${n}$$ pionków w jednym rzędzie. Ile odcinków między parami pionków można wyznaczyć?`,
        `Na stole leży $$${n}$$ monet w rzędzie. Ile odległości między parami monet można zmierzyć?`,
      ],
    };

    const typeTemplates = templates[type] || templates["handshakes"];
    return MathUtils.randomElement(typeTemplates);
  }

  /**
   * Get description templates for team selection
   */
  static getTeamSelectionTemplates(k, total) {
    const descriptions = {
      2: [
        `Z grupy liczącej $$${total}$$ osób wybieramy dwuosobową delegację. Na ile sposobów można to zrobić?`,
        `Na ile sposobów można wybrać 2 osoby z $$${total}$$ do wspólnego projektu?`,
        `W klasie jest $$${total}$$ uczniów. Na ile sposobów można wybrać 2-osobową reprezentację?`,
        `Z $$${total}$$ kandydatów wybieramy 2 osoby na stanowiska. Na ile sposobów można to zrobić?`,
        `W grupie $$${total}$$ znajomych każdy chce zagrać w tenisa. Ile można utworzyć par?`,
        `Na ile sposobów można wybrać 2-osobową grupę z $$${total}$$ osób?`,
        `W bibliotece jest $$${total}$$ książek. Na ile sposobów można wybrać 2 do przeczytania?`,
        `W talii jest $$${total}$$ kart. Na ile sposobów można wylosować 2 karty?`,
        `Na ile sposobów można wybrać parę strażaków z $$${total}$$ chętnych?`,
        `Z $$${total}$$ pracowników wybieramy 2 osoby na szkolenie. Ile możliwości?`,
        `W turnieju ping-ponga startuje $$${total}$$ graczy. Każdy gra z każdym raz. Ile meczów?`,
        `Na ile sposobów można ustalić kolejność 2-osobową z $$${total}$$ osób?`,
      ],
      3: [
        `Z grupy liczącej $$${total}$$ osób wybieramy trzyosobową delegację. Na ile sposobów można to zrobić?`,
        `Na ile sposobów można wybrać 3 osoby z $$${total}$$ do komisji?`,
        `W firmie pracuje $$${total}$$ osób. Na ile sposobów można wybrać 3-osobowy zespół?`,
        `Z $$${total}$$ kandydatów wybieramy 3-osobową radę. Na ile sposobów?`,
        `W klasie jest $$${total}$$ uczniów. Na ile sposobów można wybrać 3-osobową grupę?`,
        `Na ile sposobów można wybrać 3 przedmioty z $$${total}$$ możliwych?`,
        `Z $$${total}$$ kolorów wybieramy 3 do mieszanki. Ile możliwości?`,
        `W sklepie jest $$${total}$$ produktów. Na ile sposobów można wybrać 3?`,
        `Na ile sposobów można wybrać 3-osobową ekipę filmową z $$${total}$$ osób?`,
        `W stadninie jest $$${total}$$ koni. Na ile sposobów można wybrać 3 do wyścigu?`,
      ],
      4: [
        `Z grupy liczącej $$${total}$$ osób wybieramy czteroosobową delegację. Na ile sposobów można to zrobić?`,
        `Na ile sposobów można wybrać 4 osoby z $$${total}$$ do zespołu projektowego?`,
        `W szkole jest $$${total}$$ uczniów. Na ile sposobów można wybrać 4-osobową drużynę?`,
        `Z $$${total}$$ kandydatów wybieramy 4 osoby do zarządu. Na ile sposobów?`,
        `Na ile sposobów można wybrać 4 książki z $$${total}$$ dostępnych?`,
        `W banku jest $$${total}$$ pracowników. Na ile sposobów można wybrać 4-osobowy zespół?`,
        `Z $$${total}$$ miast wybieramy 4 do wizyty. Ile możliwości?`,
        `Na ile sposobów można wybrać 4-elementowy podzbiór z $$${total}$$ elementów?`,
      ],
      5: [
        `Z grupy liczącej $$${total}$$ osób wybieramy pięcioosobową delegację. Na ile sposobów można to zrobić?`,
        `Na ile sposobów można wybrać 5 osób z $$${total}$$ do rady pracowniczej?`,
        `W klubie jest $$${total}$$ członków. Na ile sposobów można wybrać 5-osobowy zarząd?`,
        `Z $$${total}$$ zawodników wybieramy 5-osobową drużynę. Na ile sposobów?`,
        `Na ile sposobów można wybrać 5 kart z $$${total}$$?`,
        `W fabryce pracuje $$${total}$$ osób. Na ile sposobów można wybrać 5-osobową komisję?`,
        `Z $$${total}$$ projektów wybieramy 5 do realizacji. Ile możliwości?`,
      ],
      6: [
        `Z grupy liczącej $$${total}$$ osób wybieramy sześcioosobową delegację. Na ile sposobów można to zrobić?`,
        `Na ile sposobów można wybrać 6 osób z $$${total}$$ do komitetu?`,
        `W szkole jest $$${total}$$ nauczycieli. Na ile sposobów można wybrać 6-osobową radę?`,
        `Z $$${total}$$ produktów wybieramy 6 do testów. Na ile sposobów?`,
        `W kole żeglarskim jest $$${total}$$ osób. Na ile sposobów można wybrać 6-osobową załogę?`,
        `Na ile sposobów można wybrać 6 liczb z $$${total}$$ w loterii?`,
      ],
    };

    const kTemplates = descriptions[k] || descriptions[2];
    return MathUtils.randomElement(kTemplates);
  }
}

module.exports = CombinationsValues;
