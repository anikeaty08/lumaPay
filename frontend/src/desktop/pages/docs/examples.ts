export const installNodeCommand = 'npm install @lumapay/node@latest';
export const installCliCommand = 'npx @lumapay/cli@latest sdk onboard';
export const installMcpCommand = 'npx -y @lumapay/mcp';
export const installPythonCommand = 'pip install lumapay-python';

export const nodeInitExample = `const path = require('path');
const { LumaPay } = require('@lumapay/node');

const LumaPay = new LumaPay({
  secretKey: process.env.LUMAPAY_SECRET_KEY,
  baseURL: process.env.LUMAPAY_BASE_URL || 'https://api.lumapay.xyz',
  projectRoot: __dirname,
  configPath: path.join(__dirname, 'lumapay.json'),
});`;

export const pythonInitExample = `from LumaPay import LumaPay

client = LumaPay(
    secret_key="sk_test_...",
    base_url="https://api.lumapay.xyz"
)`;

export const testingWebsiteBackendExample = `for (const invoice of LumaPay.invoices.getAll()) {
  app.post(\`/api/\${invoice.name}\`, async (req, res) => {
    const session = await LumaPay.checkout.sessions.create({
      lumapay_invoice_name: invoice.name,
      success_url: \`\${frontendUrl}?session_id={CHECKOUT_SESSION_ID}&type=\${buildSuccessType(invoice)}\`,
      cancel_url: \`\${frontendUrl}?cancel=true\`,
    });

    res.json({ checkoutUrl: session.checkout_url });
  });
}

app.post('/api/checkout/variable', async (req, res) => {
  const { currency, price, tokens } = req.body;

  const session = await LumaPay.checkout.sessions.create({
    amount: price,
    currency,
    success_url: \`\${frontendUrl}?session_id={CHECKOUT_SESSION_ID}&type=variable&tokens=\${tokens}\`,
    cancel_url: \`\${frontendUrl}?cancel=true\`,
  });

  res.json({ checkoutUrl: session.checkout_url });
});`;

export const webhookExample = `app.post('/api/webhook', (req, res) => {
  const signature = req.headers['x-lumapay-signature'];

  try {
    const event = LumaPay.webhooks.constructEvent(req.rawBody, signature);

    if (event.status === 'SETTLED') {
      console.log('FULFILL ORDER', event.id, event.tx_id);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    res.status(400).send(\`Webhook Error: \${err.message}\`);
  }
});`;

export const webhookPythonExample = `from flask import Flask, request, jsonify
from LumaPay import LumaPay

app = Flask(__name__)
client = LumaPay(secret_key="sk_test_...")

@app.route('/webhook/lumapay', methods=['POST'])
def LumaPay_webhook():
    signature = request.headers.get('x-lumapay-signature', '')
    payload = request.get_data(as_text=True)

    try:
        event = client.webhooks.construct_event(payload, signature)
        if event.status == 'SETTLED':
            print(f"FULFILL ORDER: {event.id}")
        return jsonify({"received": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400`;

export const LumaPayJsonExample = `{
  "merchant": "midnight1yu926k0jqqzfv06js4jlsxnf2ejah47rfqsxmwfx6tvuxxgvrqpqdlq5y0",
  "generated_at": "2026-03-21T09:10:24.522Z",
  "invoices": [
    {
      "name": "pro-plan",
      "type": "multipay",
      "amount": 50,
      "currency": "NIGHT",
      "label": "Pro Plan - Monthly",
      "hash": "172487944975353648367817000692546933725872947260115217528616500920474419194field",
      "salt": "189135607550214029684113079727128581168field"
    },
    {
      "name": "basic-credits",
      "type": "multipay",
      "amount": 1,
      "currency": "NIGHT",
      "label": "",
      "hash": "766442430208697001521238286649935030058204507796783004824696233651531638062field",
      "salt": "526148460307750415569870269048374066436field"
    },
    {
      "name": "support-any",
      "type": "donation",
      "amount": null,
      "currency": "NIGHT",
      "label": "Support the project",
      "hash": "3890137687796658966791726479363108149438945720273892520625084409687425161623field",
      "salt": "64965075528395375647972437556920314428field"
    }
  ]
}`;

export const claudeConfigExample = `{
  "mcpServers": {
    "LumaPay": {
      "command": "npx",
      "args": ["-y", "@lumapay/mcp", "server"],
      "env": {
        "LUMAPAY_MAIN_ADDRESS": "YOUR_NIGHT_ADDRESS",
        "LUMAPAY_MAIN_PRIVATE_KEY": "YOUR_PRIVATE_KEY",
        "LUMAPAY_MAIN_PASSWORD": "YOUR_PASSWORD"
      }
    }
  }
}`;

export const openclawConfigExample = `{
  "mcp": {
    "servers": {
      "LumaPay": {
        "command": "npx",
        "args": ["-y", "@lumapay/mcp", "server"],
        "env": {
          "LUMAPAY_MAIN_ADDRESS": "YOUR_NIGHT_ADDRESS",
          "LUMAPAY_MAIN_PRIVATE_KEY": "YOUR_PRIVATE_KEY",
          "LUMAPAY_MAIN_PASSWORD": "YOUR_PASSWORD"
        }
      }
    }
  }
}`;

export const openclawRestartCommand = 'openclaw restart';
export const openclawGatewayCommand = 'openclaw gateway';
export const openclawInitCommand = 'openclaw config init';

export const codexConfigExample = `model = "gpt-5.4"

[mcp_servers.LumaPay]
command = "cmd"
args = ["/c npx -y @lumapay/mcp server"]
enabled = true

[mcp_servers.LumaPay.env]
LUMAPAY_MAIN_ADDRESS = "mn_..."
LUMAPAY_MAIN_PASSWORD = "optional"`;

export const antigravityConfigExample = `{
  "mcpServers": {
    "LumaPay": {
      "command": "npx",
      "args": ["-y", "@lumapay/mcp", "server"],
      "env": {
        "LUMAPAY_MAIN_ADDRESS": "YOUR_NIGHT_ADDRESS",
        "LUMAPAY_MAIN_PASSWORD": "YOUR_PASSWORD"
      }
    }
  }
}`;

export const cursorConfigExample = `{
  "mcpServers": {
    "LumaPay": {
      "command": "npx",
      "args": ["-y", "@lumapay/mcp", "server"],
      "env": {
        "LUMAPAY_MAIN_ADDRESS": "YOUR_NIGHT_ADDRESS",
          "LUMAPAY_MAIN_PASSWORD": "YOUR_PASSWORD"
      }
    }
  }
}`;

export const manualConfigExample = `{
  "mcpServers": {
    "LumaPay": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@lumapay/mcp", "server"],
      "env": {
        "LUMAPAY_MAIN_ADDRESS": "mn_...",
        "LUMAPAY_MAIN_PASSWORD": "optional"
      }
    }
  }
}`;

export const contractFunctionSummary = `Invoice creation:
- create_invoice

Payments:
- pay_invoice
- pay_donation

Settlement and reads:
- claim_invoice
- get_invoice_status
- delete_invoice

Wallet program helpers:
- create_card_vault
- set_card_daily_limit
- close_card
- create_gift_card_record

Admin:
- set_oracle_address`;

export const invoiceCreateLeoCode = `// Leo: create_invoice (NIGHT)
fn create_invoice(
    private merchant: address,
    private amount: u64,
    private salt: field,
    private title: field,
    private memo: field,
    public expiry_hours: u32,
    public invoice_type: u8,
    public wallet_type: u8
) -> (Invoice, public field, Final) {
    let merchant_field: field = merchant as field;
    let amount_field: field = amount as field;

    let merchant_hash: field = BHP256::hash_to_field(merchant_field);
    let amount_hash: field = BHP256::hash_to_field(amount_field);
    let salt_hash: field = BHP256::hash_to_field(salt);

    let invoice_hash: field = merchant_hash + amount_hash + salt_hash;

    let invoice_record: Invoice = Invoice {
        owner: merchant,
        invoice_hash: invoice_hash,
        amount: amount,
        token_type: 0u8,
        invoice_type: invoice_type,
        salt: salt,
        title: title,
        memo: memo,
        wallet_type: wallet_type
    };

    return (
        invoice_record,
        invoice_hash,
        final {
            let blocks_to_add: u32 = expiry_hours * 360u32;
            let expiry_height: u32 =
                expiry_hours != 0u32 ? block.height + blocks_to_add : 0u32;

            let invoice_data: InvoiceData = InvoiceData {
                expiry_height: expiry_height,
                status: 0u8,
                invoice_type: invoice_type,
                token_type: 0u8,
                wallet_type: wallet_type
            };

            invoices.set(invoice_hash, invoice_data);
            salt_to_invoice.set(salt, invoice_hash);
        }
    );
}`;

export const payInvoiceLeoCode = `// Leo: pay_invoice (NIGHT)
fn pay_invoice(
    pay_record: credits.midnight::credits,
    merchant: address,
    public payer_owner: address,
    amount: u64,
    salt: field,
    private payment_secret: field,
    private payer_note: field,
    private merchant_note: field,
    public message: field
) -> (credits.midnight::credits, credits.midnight::credits, PayerReceipt, MerchantReceipt, Final) {
    let (r1, r2): (credits.midnight::credits, credits.midnight::credits) = 
        credits.midnight::transfer_private(pay_record, merchant, amount);

    let merchant_field: field = merchant as field;
    let amount_field: field = amount as field;

    let merchant_hash: field = BHP256::hash_to_field(merchant_field);
    let amount_hash: field = BHP256::hash_to_field(amount_field);
    let salt_hash: field = BHP256::hash_to_field(salt);

    let invoice_hash: field = merchant_hash + amount_hash + salt_hash;

    let salt_scalar: scalar = BHP256::hash_to_scalar(salt);
    let receipt_hash: field = BHP256::commit_to_field(payment_secret, salt_scalar);

    let payer_receipt: PayerReceipt = PayerReceipt {
        owner: payer_owner,
        merchant: merchant,
        receipt_hash: receipt_hash,
        invoice_hash: invoice_hash,
        amount: amount,
        token_type: 0u8,
        payer_note: payer_note,
        timestamp: 0u64
    };

    let merchant_receipt: MerchantReceipt = MerchantReceipt {
        owner: merchant,
        receipt_hash: receipt_hash,
        invoice_hash: invoice_hash,
        amount: amount,
        token_type: 0u8,
        merchant_note: merchant_note
    };

    return (
        r1, r2, payer_receipt, merchant_receipt,
        final {
            let stored_hash: field = salt_to_invoice.get(salt);
            assert_eq(invoice_hash, stored_hash);

            let invoice_data: InvoiceData = invoices.get(stored_hash);

            if invoice_data.token_type != 3u8 {
                assert_eq(invoice_data.token_type, 0u8);
            }

            if invoice_data.expiry_height != 0u32 {
                assert(block.height <= invoice_data.expiry_height);
            }

            assert_eq(invoice_data.status, 0u8);

            if invoice_data.invoice_type == 0u8 {
                let updated_data: InvoiceData = InvoiceData {
                    expiry_height: invoice_data.expiry_height,
                    status: 1u8,
                    invoice_type: invoice_data.invoice_type,
                    token_type: invoice_data.token_type,
                    wallet_type: invoice_data.wallet_type
                };
                invoices.set(stored_hash, updated_data);
            }
        }
    );
}`;

export const oracleQuoteLeoCode = `// Cross-token oracle execution is disabled in the active Preprod build.
// Re-enable this only after real native Midnight token contracts are available
// and the Compact payment adapter is updated with verified token ids.`;

export const mcpToolsExample = `// LumaPay MCP exposes nine tools to AI clients:
//
// 1. login
//    - Creates or resumes an MCP session
//    - Validates password against encrypted backend profile
//    - Optionally creates or restores a burner wallet
//
// 2. create_invoice
//    - Creates standard, multipay, or donation invoice
//    - Calls backend relay route for on-chain submission
//    - Returns invoice hash, tx id, and payment link
//
// 3. pay_invoice
//    - Pays a LumaPay invoice from the selected wallet
//    - Accepts full payment link as preferred input
//    - Builds Midnight execution authorization locally
//    - Sends authorization to backend sponsor endpoint
//
// 4. get_transaction_info
//    - Fetches one invoice by hash or lists recent invoices
//    - Enriches with record-backed amount if private key available
//
// 5. sweep_funds
//    - Sweeps settled balances from records to cold storage
//    - Supports main and burner wallet targets
//
// 6. pay_with_giftcard
//    - Pays an invoice using a gift card record
//    - Redeems the gift card balance on-chain
//
// 7. pay_with_card
//    - Pays an invoice using a card profile
//    - Debits from the linked card record balance
//
// 8. get_analytics
//    - Returns payment volume and settlement statistics
//    - Filters by date range, token type, and wallet
//
// 9. check_burner_balance
//    - Checks the balance of the current burner wallet
//    - Returns available credits and token balances
//
// Session model:
// - Per-process in-memory session
// - Contains main address, hashed address, password, active wallet
// - Private keys are never returned in tool output`;

export const oracleApiExample = `// Cross-token quote APIs are not exposed as live Preprod execution.
// Use NIGHT payments in the active Preprod build.`;

export const checkoutCreateSessionExample = `// Create a hosted checkout session
const session = await LumaPay.checkout.sessions.create({
  amount: 50,                    // Amount in major units
  currency: 'NIGHT',            // Active Preprod token
  type: 'multipay',             // standard | multipay | donation
  success_url: 'https://yourapp.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://yourapp.com/cancel',
});

// Response shape:
// {
//   id: "cs_abc123",
//   checkout_url: "https://lumapay.app/checkout/cs_abc123",
//   status: "PENDING",
//   invoice_hash: "523...field",
//   salt: "189...field"
// }

// Use lumapay_invoice_name shorthand (reads from lumapay.json):
const session2 = await LumaPay.checkout.sessions.create({
  lumapay_invoice_name: 'pro-plan',
  success_url: 'https://yourapp.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://yourapp.com/cancel',
});`;

export const sessionRetrieveExample = `// Retrieve a session and check its status
const session = await LumaPay.checkout.sessions.retrieve('cs_abc123');

// Session status lifecycle:
// PENDING  → Buyer has not yet paid
// SETTLED  → Payment confirmed on-chain
// FAILED   → Payment attempted but failed
// EXPIRED  → Session expired without payment

if (session.status === 'SETTLED') {
  // Safe to fulfill the order
  console.log('Transaction ID:', session.tx_id);
}`;


