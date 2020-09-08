import styled from 'styled-components';

export const BaseForm = styled.form`
  padding-top: 15px;
`;

export const FormControl = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const FormLabel = styled.label`
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const InputField = styled.input`
  min-height: ${props => props.minheight ? props.minheight : '40px'};
  width: ${props => props.w ? props.w : 'auto'};
  padding: 10px 15px;
  border: 2px solid #000;
  background: transparent;
  outline: none;
  border-radius: 4px;
`;