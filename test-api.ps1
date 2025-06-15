# SEO Audit Backend API Test Script (PowerShell)
# This script tests all API endpoints

$API_URL = "http://localhost:3000"
$TEST_EMAIL = "test$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
$TEST_PASSWORD = "password123"

Write-Host "🧪 Testing SEO Audit Backend API..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

# Test 1: Register a new user
Write-Host "`n1. Testing Registration..." -ForegroundColor Yellow
$registerBody = @{
    email = $TEST_EMAIL
    password = $TEST_PASSWORD
} | ConvertTo-Json

$registerResponse = Invoke-RestMethod -Uri "$API_URL/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $registerBody

Write-Host "Response: $($registerResponse | ConvertTo-Json -Compress)"
$TOKEN = $registerResponse.token

if (-not $TOKEN) {
    Write-Host "❌ Registration failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Registration successful" -ForegroundColor Green
Write-Host "Token: $TOKEN"

# Test 2: Get current user
Write-Host "`n2. Testing Get Current User..." -ForegroundColor Yellow
$headers = @{
    Authorization = "Bearer $TOKEN"
}

$meResponse = Invoke-RestMethod -Uri "$API_URL/api/auth/me" `
    -Method Get `
    -Headers $headers

Write-Host "Response: $($meResponse | ConvertTo-Json -Compress)"
Write-Host "✅ Get current user successful" -ForegroundColor Green

# Test 3: Create an audit
Write-Host "`n3. Testing Create Audit..." -ForegroundColor Yellow
$auditBody = @{
    url = "https://example.com"
} | ConvertTo-Json

$auditResponse = Invoke-RestMethod -Uri "$API_URL/api/audits" `
    -Method Post `
    -Headers $headers `
    -ContentType "application/json" `
    -Body $auditBody

Write-Host "Response: $($auditResponse | ConvertTo-Json -Compress)"
$AUDIT_ID = $auditResponse.auditId

if (-not $AUDIT_ID) {
    Write-Host "❌ Create audit failed" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Audit created successfully" -ForegroundColor Green
Write-Host "Audit ID: $AUDIT_ID"

# Test 4: Get audit list
Write-Host "`n4. Testing Get Audits List..." -ForegroundColor Yellow
$listResponse = Invoke-RestMethod -Uri "$API_URL/api/audits" `
    -Method Get `
    -Headers $headers

Write-Host "Response: $($listResponse | ConvertTo-Json -Compress)"
Write-Host "✅ Get audits list successful" -ForegroundColor Green

# Test 5: Get specific audit
Write-Host "`n5. Testing Get Specific Audit..." -ForegroundColor Yellow
Start-Sleep -Seconds 2 # Wait a bit for processing

$auditDetail = Invoke-RestMethod -Uri "$API_URL/api/audits/$AUDIT_ID" `
    -Method Get `
    -Headers $headers

Write-Host "Response: $($auditDetail | ConvertTo-Json -Compress)"
Write-Host "✅ Get specific audit successful" -ForegroundColor Green

# Test 6: Logout
Write-Host "`n6. Testing Logout..." -ForegroundColor Yellow
$logoutResponse = Invoke-RestMethod -Uri "$API_URL/api/auth/logout" `
    -Method Post `
    -Headers $headers

Write-Host "Response: $($logoutResponse | ConvertTo-Json -Compress)"
Write-Host "✅ Logout successful" -ForegroundColor Green

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "✅ All tests completed successfully!" -ForegroundColor Green
