import { Controller, Get, Redirect } from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('api/health-check')
@Controller()
export class HealthCheckController {
  @Get('api/health-check')
  @ApiOperation({
    summary: 'Health Check',
  })
  @ApiOkResponse({
    description: 'Health Check',
    content: {
      applicationJson: {
        example: {
          message: 'Health check is OK!',
        },
      },
    },
  })
  healthCheck() {
    return {
      message: 'Health check is OK!',
    };
  }

  @ApiExcludeEndpoint()
  @Get()
  @Redirect('api/health-check', 302)
  redirectToHealthCheck() {
    return;
  }
}
