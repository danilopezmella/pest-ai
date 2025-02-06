# Search Examples PowerShell Script
# This script contains examples of different search methods and test questions

# Helper function to make the API calls and format results nicely
function Invoke-Search {
    param (
        [string]$SearchMethod,
        [string]$Question,
        [float]$Alpha = 0.5
    )
    
    Write-Host "`n=== Testing $SearchMethod search ===" -ForegroundColor Green
    Write-Host "Question: $Question" -ForegroundColor Yellow
    Write-Host "Alpha: $Alpha" -ForegroundColor Yellow
    
    $uri = if ($SearchMethod -eq "default") {
        "http://127.0.0.1:8000/api/ask"
    } else {
        "http://127.0.0.1:8000/api/ask?search_method=$SearchMethod&alpha=$Alpha"
    }
    
    $body = @{
        user_id = "789"
        question = $Question
    } | ConvertTo-Json
    
    Write-Host "Making request to: $uri" -ForegroundColor Gray
    
    try {
        $result = Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body
        Write-Host "Results:" -ForegroundColor Green
        return $result | ConvertTo-Json -Depth 10
    }
    catch {
        Write-Host "Error occurred: $_" -ForegroundColor Red
    }
}

# Test questions to try
$questions = @(
    "derforgive"
)

# Example 1: Default Search (Hybrid with default alpha 0.5)
Write-Host "`n=== Default Search Examples ===" -ForegroundColor Cyan
foreach ($q in $questions) {
    Invoke-Search -SearchMethod "default" -Question $q
}

# Example 2: Semantic Search Only
Write-Host "`n=== Semantic Search Examples ===" -ForegroundColor Cyan
foreach ($q in $questions) {
    Invoke-Search -SearchMethod "semantic" -Question $q
}

# Example 3: Keyword Search Only
Write-Host "`n=== Keyword Search Examples ===" -ForegroundColor Cyan
foreach ($q in $questions) {
    Invoke-Search -SearchMethod "keyword" -Question $q
}

# Example 4: Hybrid Search with Custom Alpha (0.7 weight to keywords)
Write-Host "`n=== Hybrid Search (Alpha 0.7) Examples ===" -ForegroundColor Cyan
foreach ($q in $questions) {
    Invoke-Search -SearchMethod "hybrid" -Question $q -Alpha 0.7
}

# Example 5: Hybrid Search with Keyword Filter
Write-Host "`n=== Hybrid Search with Keyword Filter Examples ===" -ForegroundColor Cyan
foreach ($q in $questions) {
    Invoke-Search -SearchMethod "hybrid_filtered" -Question $q -Alpha 0.7
}

# Individual Test Examples (commented out - uncomment to use)
<#
# Test specific questions with different methods:
Invoke-Search -SearchMethod "semantic" -Question "What is maxcompdim?"
Invoke-Search -SearchMethod "keyword" -Question "How do I create a workflow?"
Invoke-Search -SearchMethod "hybrid" -Question "What are credentials used for?" -Alpha 0.7
Invoke-Search -SearchMethod "hybrid_filtered" -Question "How to handle errors?" -Alpha 0.6
#> 