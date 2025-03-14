'use client'

import { AgGridReact } from "ag-grid-react"
import { useEffect, useMemo, useState } from "react"
import { AllCommunityModule, ColDef, colorSchemeDarkWarm, ICellRendererParams, ModuleRegistry, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy, themeQuartz } from 'ag-grid-community';
import { PokemonMoveData } from "@/_types/pokemon";
import { TypeDisplay } from "./typeDisplay";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
    moves: {name: string, url: string}[]
}

type Move = {name: string, url: string} | PokemonMoveData;

export function MovesGrid({moves}: Props){
    const [fetchNext, setFetchNext] = useState(0); 
    const [rowData, setRowData] = useState<Move[]>(moves.map(m => ({...m})));
    const [columns] = useState<ColDef[]>([
        {field: "name", },
        {field: "accuracy"},
        {field: "power"},
        {field: "pp"},
        {field: "type.name", headerName:'Type', cellRenderer: (c:ICellRendererParams) => <TypeDisplay type={c.value} className="leading-5 text-center my-1.5"/>, }
    ])

    const autoSizeStrategy = useMemo<
        | SizeColumnsToFitGridStrategy
        | SizeColumnsToFitProvidedWidthStrategy
        | SizeColumnsToContentStrategy
      >(() => {
        return {
          type: "fitGridWidth",
          defaultMinWidth: 100,
        };
      }, []);
    

    async function loadMoveData(url: string, name: string){
        const response = await fetch(url, {cache: 'force-cache'});
        if (!response.ok) return null;
        const result: PokemonMoveData = await response.json();
        
        setRowData((moves) => {
            const currentMove = moves.find(m => m.name === name);
            if (!currentMove) return moves;
            const currentIndex = moves.indexOf(currentMove);
            const abc = [...moves.slice(0,currentIndex), {...result, url: url}, ...moves.slice(currentIndex+1)]
            return abc;
        })
    }

    useEffect(() => {
      if (fetchNext > rowData.length){
        return;
      }
      const batchsize = 25;
      async function loadNext() {
        const promises = rowData.slice(fetchNext,fetchNext+batchsize).map(m => {
          if ((m as PokemonMoveData).pp !== undefined){
            return Promise.resolve();
          }
          
          return loadMoveData(m.url, m.name);
        })
  
        await Promise.all(promises);
      }

      loadNext();

      setTimeout(() => {
        setFetchNext(n => n+batchsize);
      }, 250);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNext]);

    const theme = themeQuartz.withPart(colorSchemeDarkWarm).withParams({
        backgroundColor: 'var(--color-red-950)',
        foregroundColor: 'var(--color-white)',
        borderRadius: '1px',
    })

    return fetchNext < rowData.length +0 ? <div className="self-stretch h-full bg-red-950 text-white rounded-xl flex justify-center items-center border-[1px] border-white/5">LOADING...</div> : <AgGridReact rowData={rowData} columnDefs={columns} theme={theme} autoSizeStrategy={autoSizeStrategy}/>
}