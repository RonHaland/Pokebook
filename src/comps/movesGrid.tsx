'use client'

import { AgGridReact } from "ag-grid-react"
import { useMemo, useState } from "react"
import { AllCommunityModule, ColDef, ICellRendererParams, ModuleRegistry, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy, themeQuartz } from 'ag-grid-community';
import { PokemonMoveData } from "@/_types/pokemon";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
    moves: {name: string, url: string}[]
}

type Move = {name: string, url: string} | PokemonMoveData;

export function MovesGrid({moves}: Props){
    const [rowData, setRowData] = useState<Move[]>(moves.map(m => ({...m, loadMove: {name: m.name, url: m.url}})));
    const [columns] = useState<ColDef[]>([
        {field: "name", },
        {field: "loadMove", cellRenderer: (c: ICellRendererParams) => <>{c.value?.url?.length && <button className="font-bold bg-red-950 px-2 rounded-lg" onClick={() => loadMoveData(c.value?.url, c.value?.name)}>Load</button>}</>},
        {field: "accuracy"},
        {field: "power"},
        {field: "pp"}
    ])

    const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: "fitGridWidth",
      defaultMinWidth: 100,
      columnLimits: [
        {
          colId: "country",
          minWidth: 900,
        },
      ],
    };
  }, []);
    

    async function loadMoveData(url: string, name: string){
        const response = await fetch(url, {cache: 'force-cache'});
        if (!response.ok) return null;
        const result: PokemonMoveData = await response.json();

        console.log(result);
        
        setRowData((moves) => {
            const currentMove = moves.find(m => m.name === name);
            if (!currentMove) return moves;
            const currentIndex = moves.indexOf(currentMove);
            const abc = [...moves.slice(0,currentIndex), {...result, url: url}, ...moves.slice(currentIndex+1)]
            return abc;
        })
    }

    const theme = themeQuartz.withParams({
        backgroundColor: 'var(--color-red-900)',
        foregroundColor: 'var(--color-white)',
        
    })

    return <AgGridReact rowData={rowData} columnDefs={columns} theme={theme} autoSizeStrategy={autoSizeStrategy}/>
}