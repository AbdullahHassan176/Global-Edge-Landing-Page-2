import { NextRequest, NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import { ProvenanceReportPDF } from '@/components/pdf/ProvenanceReportPDF';

interface TimelineItem {
  type: 'event' | 'doc';
  event?: {
    txHash: string;
    eventType: string;
    eventTime: string;
    signer: string;
  };
  doc?: {
    docHash: string;
    kind: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const assetKey = searchParams.get('assetKey');

    if (!assetKey) {
      return NextResponse.json(
        { error: 'Asset key is required' },
        { status: 400 }
      );
    }

    // Mock timeline data - replace with actual tokensClient.getTimeline call
    const mockTimeline: TimelineItem[] = [
      {
        type: 'event',
        event: {
          txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          eventType: 'TokenMinted',
          eventTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          signer: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
        }
      },
      {
        type: 'event',
        event: {
          txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          eventType: 'Transfer',
          eventTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          signer: '0x8ba1f109551bD432803012645Hac136c'
        }
      },
      {
        type: 'doc',
        doc: {
          docHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
          kind: 'Legal Agreement'
        }
      },
      {
        type: 'event',
        event: {
          txHash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
          eventType: 'Approval',
          eventTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          signer: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
        }
      },
      {
        type: 'doc',
        doc: {
          docHash: '0x1111222233334444555566667777888899990000aaaabbbbccccddddeeeeffff',
          kind: 'Audit Report'
        }
      },
      {
        type: 'event',
        event: {
          txHash: '0x2222333344445555666677778888999900001111aaaabbbbccccddddeeeeffff00',
          eventType: 'OwnershipTransferred',
          eventTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
          signer: '0x8ba1f109551bD432803012645Hac136c'
        }
      },
      {
        type: 'doc',
        doc: {
          docHash: '0x3333444455556666777788889999000011112222aaaabbbbccccddddeeeeffff00',
          kind: 'Insurance Certificate'
        }
      },
      {
        type: 'event',
        event: {
          txHash: '0x4444555566667777888899990000111122223333aaaabbbbccccddddeeeeffff00',
          eventType: 'TokenBurned',
          eventTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
          signer: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
        }
      },
      {
        type: 'doc',
        doc: {
          docHash: '0x5555666677778888999900001111222233334444aaaabbbbccccddddeeeeffff00',
          kind: 'Compliance Report'
        }
      },
      {
        type: 'event',
        event: {
          txHash: '0x6666777788889999000011112222333344445555aaaabbbbccccddddeeeeffff00',
          eventType: 'Pause',
          eventTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
          signer: '0x8ba1f109551bD432803012645Hac136c'
        }
      }
    ];

    // In production, replace this with:
    // const timeline = await tokensClient.getTimeline(assetKey, { limit: 10 });

    const generatedAt = new Date().toLocaleString();
    
    // Generate PDF
    const pdfStream = await pdf(ProvenanceReportPDF({ 
      assetKey, 
      timeline: mockTimeline, 
      generatedAt 
    })).toBlob();

    // Return PDF as stream
    return new NextResponse(pdfStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="provenance-report-${assetKey}.pdf"`,
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Error generating provenance PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate provenance report' },
      { status: 500 }
    );
  }
}
