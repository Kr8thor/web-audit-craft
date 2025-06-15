#!/bin/bash

# SEO Audit Backend API Test Script
# This script tests all API endpoints

API_URL="http://localhost:3000"
TEST_EMAIL="test$(date +%s)@example.com"
TEST_PASSWORD="password123"

echo "🧪 Testing SEO Audit Backend API..."
echo "=================================="

# Test 1: Register a new user
echo -e "\n1. Testing Registration..."
REGISTER_RESPONSE=$(curl -s -X POST $API_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}")

echo "Response: $REGISTER_RESPONSE"
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')

if [ -z "$TOKEN" ]; then
  echo "❌ Registration failed"
  exit 1
fi

echo "✅ Registration successful"
echo "Token: $TOKEN"

# Test 2: Get current user
echo -e "\n2. Testing Get Current User..."
ME_RESPONSE=$(curl -s -X GET $API_URL/api/auth/me \
  -H "Authorization: Bearer $TOKEN")

echo "Response: $ME_RESPONSE"
echo "✅ Get current user successful"

# Test 3: Create an audit
echo -e "\n3. Testing Create Audit..."
AUDIT_RESPONSE=$(curl -s -X POST $API_URL/api/audits \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}')

echo "Response: $AUDIT_RESPONSE"
AUDIT_ID=$(echo $AUDIT_RESPONSE | grep -o '"auditId":"[^"]*' | grep -o '[^"]*$')

if [ -z "$AUDIT_ID" ]; then
  echo "❌ Create audit failed"
  exit 1
fi

echo "✅ Audit created successfully"
echo "Audit ID: $AUDIT_ID"

# Test 4: Get audit list
echo -e "\n4. Testing Get Audits List..."
LIST_RESPONSE=$(curl -s -X GET $API_URL/api/audits \
  -H "Authorization: Bearer $TOKEN")

echo "Response: $LIST_RESPONSE"
echo "✅ Get audits list successful"

# Test 5: Get specific audit
echo -e "\n5. Testing Get Specific Audit..."
sleep 2 # Wait a bit for processing
AUDIT_DETAIL=$(curl -s -X GET $API_URL/api/audits/$AUDIT_ID \
  -H "Authorization: Bearer $TOKEN")

echo "Response: $AUDIT_DETAIL"
echo "✅ Get specific audit successful"

# Test 6: Logout
echo -e "\n6. Testing Logout..."
LOGOUT_RESPONSE=$(curl -s -X POST $API_URL/api/auth/logout \
  -H "Authorization: Bearer $TOKEN")

echo "Response: $LOGOUT_RESPONSE"
echo "✅ Logout successful"

echo -e "\n=================================="
echo "✅ All tests completed successfully!"
