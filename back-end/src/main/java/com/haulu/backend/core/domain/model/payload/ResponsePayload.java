package com.haulu.backend.core.domain.model.payload;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePayload {
    private String message;
    private Object data;
    private String status;
    private Long rowCount=0L;
    private String errorCode;
}
