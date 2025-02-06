# Roadmap and Current Status

## Current Implementation Status

### 1. Base Implementation (/ask)
✓ Processes main question
✓ Generates and uses question variations
✓ Hybrid search (semantic + keywords)
✓ Basic logging and debug
✗ No reranking
✗ Basic deduplication only
✗ Limited logging
✗ Single subquestion only

### 2. Enhanced Results (/ask/reranked)
✓ All features from /ask
✓ Content length reranking
✓ Improved chunk_id deduplication
✓ Extended logging (pre/post rerank)
✗ Still limited to single subquestion
✗ No cross-subquestion deduplication

### 3. Multi-Question Support (/ask/subquestions)
✓ All features from /ask/reranked
✓ Multiple subquestion handling
✓ Cross-subquestion deduplication
✓ Per-subquestion metrics
✗ Not yet implemented

## Next Steps

1. Implement /ask/subquestions endpoint:
   - Create new endpoint maintaining existing ones
   - Start with subquestion extraction from paraphrasing
   - Reuse existing reranking and deduplication from /ask/reranked
   - Maintain comprehensive debug logging structure

2. Improve deduplication:
   - Implement cross-subquestion deduplication
   - Optimize deduplication criteria

3. Expand debug logs:
   - Add per-subquestion metrics
   - Track used variations
   - Deduplication metrics

4. Create 3 new services to prepare the data to send to the api AI:
    - Format md

    ***EXAMPLE***:
    ## Context

    ### Summary
    **{summary_self}**

    ### Header
    **{header}**

    ### Content
    {content}

    ### Source
    - **File Name:** {file_name}
    - **Main Section:** {header_level_1}
    - **Subsection:** {header_level_2}

    ### Additional Summaries
    - **Higher-Level Summary:** {header_summary_1}
    - **Detailed Summary:** {header_summary_2}

    ### Related Context
    - **Previous Summary:** {summary_prev}
    - **Next Summary:** {summary_next}

    ### Metadata
    - **Keywords:** {keywords}
    - **Chunk ID:** {chunk_id}
    - **Chunk Index:** {chunk_index}
    - **Previous Chunk ID:** {prev_id}
    - **Next Chunk ID:** {next_id}


    ***END OF EXAMPLE***


    - Concatenate md files
    - Deduplicate md files using a deduplication method (simple just from top to bottom)

5. Add WebSocket support:
   - Implement WebSocket communication for status updates
   - Update frontend to handle WebSocket messages



## Important Notes
- Question variations are ALREADY implemented in both existing endpoints
- Reranking and deduplication are implemented in search_routes.py
- New endpoint will combine subquestion handling with existing reranking
- Keeping existing endpoints allows for comparison and testing


## Development History
1. First step: /ask with basic handling and variations
2. Second step: /ask/reranked adding reranking and improved deduplication
3. Current step: New /ask/subquestions endpoint for multiple subquestions

## Reminders
- DO NOT modify existing working endpoints
- Create new endpoint for subquestion handling
- Maintain backward compatibility
- Document all changes in debug files
- Use iterative approach starting with subquestion extraction

quiero que recuerdes que estabamos haciendo. claramente se te olvido. Estabamos en:

Normalizar scores para comparación justa : check.
Mejorar pregunta general y splitear.
Manejar múltiples variaciones de preguntas
Mejorar la deduplicación
Agregar más logs de debug para verificar el proceso



te explico porque tenemos todo esto asi:

1.-  Efectivamente eso debemos usar @paraphrase_service_nokw.py 

2.- en routes empezamos con esto: tenemos el endpoint /ask_multi: pero cambiamos creo que porque queriamos probar en otro endpoint separado. No esta malo. quizas podemos sacar de ahi lo que nos sirva y usarlo en @search_routes.py  (?) Eso era una prueba

3.- En search_routes.py tenemos una implementación más simple que solo usa la primera subpregunta: es porque estamos avanzando baby steps.



Y tenemos código útil en el endpoint /ask_multi que podemos reutilizar.
Entonces, el siguiente baby step sería:
Mantener la estructura actual de search_routes.py pero extenderla para manejar todas las subpreguntas
Usar el nuevo hybrid_search_with_keywords_multi() que ya funciona
Mantener los logs de debug que ya tenemos en paraphrase_service_nokw.py
¿Quieres que proponga cómo modificar search_routes.py para manejar todas las subpreguntas manteniendo la simplicidad actual?