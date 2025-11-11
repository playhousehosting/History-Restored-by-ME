# Setup Script for Anthropic API Key
# Run this after you get your API key from https://console.anthropic.com/

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Anthropic API Key Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if user has the key
Write-Host "Before running this script:" -ForegroundColor Yellow
Write-Host "1. Go to https://console.anthropic.com/" -ForegroundColor White
Write-Host "2. Sign up or log in" -ForegroundColor White
Write-Host "3. Navigate to 'API Keys' section" -ForegroundColor White
Write-Host "4. Create a new key" -ForegroundColor White
Write-Host "5. Copy the key (starts with 'sk-ant-')" -ForegroundColor White
Write-Host ""

# Prompt for API key
$apiKey = Read-Host "Enter your Anthropic API key (or press Ctrl+C to cancel)"

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "Error: API key cannot be empty" -ForegroundColor Red
    exit 1
}

if (-not $apiKey.StartsWith("sk-ant-")) {
    Write-Host "Warning: API key should start with 'sk-ant-'. Are you sure this is correct?" -ForegroundColor Yellow
    $confirm = Read-Host "Continue anyway? (y/n)"
    if ($confirm -ne "y") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host ""
Write-Host "Setting API key in Convex..." -ForegroundColor Cyan

# Set for development
Write-Host ""
Write-Host "Setting for DEVELOPMENT environment..." -ForegroundColor Yellow
npx convex env set ANTHROPIC_API_KEY $apiKey

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Development environment configured" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to set development key" -ForegroundColor Red
    exit 1
}

# Set for production
Write-Host ""
Write-Host "Setting for PRODUCTION environment..." -ForegroundColor Yellow
npx convex env set ANTHROPIC_API_KEY $apiKey --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Production environment configured" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to set production key" -ForegroundColor Red
    exit 1
}

# Verify
Write-Host ""
Write-Host "Verifying configuration..." -ForegroundColor Cyan
npx convex env list

# Deploy to production
Write-Host ""
Write-Host "Would you like to deploy to production now? (y/n)" -ForegroundColor Yellow
$deploy = Read-Host
if ($deploy -eq "y") {
    Write-Host "Deploying to production..." -ForegroundColor Cyan
    npx convex deploy
    Write-Host "✓ Deployed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to /admin → AI Generator tab" -ForegroundColor White
Write-Host "2. Try generating a blog post!" -ForegroundColor White
Write-Host ""
